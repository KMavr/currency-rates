import Chip from '@mui/material/Chip';
import type { Currency } from '../../../../types/currencyTypes.ts';
import { getCurrencyLabel } from '../../../../utils/formatters.ts';

interface CurrencyChipProps {
  currency: Currency;
  onDelete?: (event: unknown) => void;
  canDelete: boolean;
  chipProps?: Record<string, unknown>;
}

function CurrencyChip({ currency, onDelete, canDelete, chipProps }: CurrencyChipProps) {
  return (
    <Chip
      {...chipProps}
      label={getCurrencyLabel(currency)}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
}

export default CurrencyChip;
