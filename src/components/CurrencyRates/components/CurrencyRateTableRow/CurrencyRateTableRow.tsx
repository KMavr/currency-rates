import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import type { Currency } from '../../../../types/currencyTypes.ts';

interface CurrencyRateTableRowProps {
  code: Currency['code'];
  rate: Currency['rate'];
}

function CurrencyRateTableRow({ code, rate }: CurrencyRateTableRowProps) {
  return (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ py: { xs: 1.5, sm: 2 } }}>
        <Typography variant="body1" fontWeight="500" fontSize={{ xs: '0.875rem', sm: '1rem' }}>
          {code}
        </Typography>
      </TableCell>
      <TableCell align="right" sx={{ py: { xs: 1.5, sm: 2 } }}>
        <Typography variant="body1" fontSize={{ xs: '0.875rem', sm: '1rem' }}>
          {rate?.toFixed(4) ?? '-'}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default CurrencyRateTableRow;
