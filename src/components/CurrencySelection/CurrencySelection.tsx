import { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';

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
      sx={{ minWidth: { xs: '100%', sm: 250 } }}
      getOptionLabel={(option) =>
        `${option.code.toUpperCase()}${option.name ? `- ${option.name}` : ''}`
      }
      onChange={(_, newValue) => {
        if (newValue) {
          setBaseCurrency(newValue.code);
        }
      }}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderInput={(params) => <TextField {...params} label="Currency" />}
    />
  );
}

export default CurrencySelection;
