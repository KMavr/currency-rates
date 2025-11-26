import TextField from '@mui/material/TextField';
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

interface CurrencyTextFieldProps {
  params: AutocompleteRenderInputParams;
  selectedCount: number;
  maxCount: number;
  minCount: number;
}

function CurrencyTextField({ params, selectedCount, maxCount, minCount }: CurrencyTextFieldProps) {
  return (
    <TextField
      {...params}
      label={`Compare against (${minCount}-${maxCount})`}
      helperText={
        selectedCount === maxCount
          ? `Maximum ${maxCount} currencies selected`
          : `${selectedCount}/${maxCount} selected (minimum ${minCount})`
      }
      error={selectedCount < minCount}
    />
  );
}

export default CurrencyTextField;
