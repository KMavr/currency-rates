import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import type { Currency } from '../../../../types/currencyTypes.ts';

interface CurrencyRateTableRowProps {
  code: Currency['code'];
  dailyRates: number[];
}

function CurrencyRateTableRow({ code, dailyRates }: CurrencyRateTableRowProps) {
  return (
    <TableRow hover>
      <TableCell
        component="th"
        scope="row"
        align="center"
        sx={{
          py: { xs: 1.5, sm: 2 },
          borderRight: 1,
          borderColor: 'divider',
        }}>
        <Typography variant="body1" fontWeight="500" fontSize={{ xs: '0.875rem', sm: '1rem' }}>
          {code}
        </Typography>
      </TableCell>
      {dailyRates.map((rate, index) => (
        <TableCell
          key={index}
          align="center"
          sx={{
            py: { xs: 1.5, sm: 2 },
          }}>
          <Typography variant="body1" fontSize={{ xs: '0.875rem', sm: '1rem' }}>
            {rate?.toFixed(4) ?? '-'}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
}

export default CurrencyRateTableRow;
