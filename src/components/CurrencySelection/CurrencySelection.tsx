import { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';
import { getCurrencyLabel, isCurrencyEqual } from '../../utils/formatters';

function CurrencySelection() {
  const { availableCurrencies, baseCurrency, setBaseCurrency, fetchAvailableCurrencies } =
    useCurrencyRatesStore();

  useEffect(() => {
    fetchAvailableCurrencies();
  }, [fetchAvailableCurrencies]);

  const selectedCurrency = availableCurrencies.find(({ code }) => code === baseCurrency);

  return (
    <Autocomplete
      disablePortal
      options={availableCurrencies}
      value={selectedCurrency || null}
      getOptionLabel={getCurrencyLabel}
      onChange={(_, newValue) => {
        if (newValue) {
          setBaseCurrency(newValue.code);
        }
      }}
      isOptionEqualToValue={isCurrencyEqual}
      renderInput={(params) => <TextField {...params} label="Currency" />}
    />
  );
}

export default CurrencySelection;
