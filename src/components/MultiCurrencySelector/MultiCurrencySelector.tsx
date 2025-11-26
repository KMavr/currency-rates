import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';
import { MAX_SELECTED_CURRENCY, MIN_SELECTED_CURRENCY } from '../../model/currencies.ts';
import { getCurrencyLabel, isCurrencyEqual } from '../../utils/formatters';
import type { Currency } from '../../types/currencyTypes.ts';
import CurrencyChip from './components/CurrencyChip/CurrencyChip.tsx';
import CurrencyTextField from './components/CurrencyTextField/CurrencyTextField.tsx';

function MultiCurrencySelector() {
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

  const {
    availableCurrencies,
    selectedCurrencies,
    fetchCurrencyRates,
    selectedDate,
    baseCurrency,
    setSelectedCurrencies,
    loadingCurrencies,
  } = useCurrencyRatesStore();

  useEffect(() => {
    if (baseCurrency && selectedDate) {
      fetchCurrencyRates();
    }
  }, [baseCurrency, selectedDate, fetchCurrencyRates]);

  const selectedCurrencyObjects = availableCurrencies.filter(({ code }) =>
    selectedCurrencies.includes(code),
  );

  const handleChange = (_, newValue: Currency[]) => {
    if (newValue.length >= MIN_SELECTED_CURRENCY && newValue.length <= MAX_SELECTED_CURRENCY) {
      const codes = newValue.map(({ code }) => code);
      setSelectedCurrencies(codes);
    }
  };

  return (
    <Autocomplete
      multiple
      limitTags={4}
      value={selectedCurrencyObjects}
      options={availableCurrencies}
      loading={loadingCurrencies}
      getOptionLabel={getCurrencyLabel}
      open={autoCompleteOpen}
      onOpen={() =>
        setAutoCompleteOpen((prev) => selectedCurrencies.length < MAX_SELECTED_CURRENCY && !prev)
      }
      onClose={() => setAutoCompleteOpen((prev) => !prev)}
      onChange={handleChange}
      isOptionEqualToValue={isCurrencyEqual}
      renderValue={(values, getItemProps) =>
        values.map((option, index) => {
          const { key, onDelete, ...itemProps } = getItemProps({ index });
          return (
            <CurrencyChip
              key={key}
              currency={option}
              onDelete={onDelete}
              canDelete={values.length > MIN_SELECTED_CURRENCY}
              chipProps={itemProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <CurrencyTextField
          params={params}
          selectedCount={selectedCurrencies.length}
          maxCount={MAX_SELECTED_CURRENCY}
          minCount={MIN_SELECTED_CURRENCY}
        />
      )}
    />
  );
}

export default MultiCurrencySelector;
