import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';
import CurrencyRateTableRow from './components/CurrencyRateTableRow/CurrencyRateTableRow.tsx';
import useCurrencySort from './hooks/useCurrencySort.ts';

function CurrencyRates() {
  const { baseCurrency } = useCurrencyRatesStore();
  const { handleSortByCode, handleSortByRate, currencyRates, sortColumn, sortOrder } =
    useCurrencySort();

  if (currencyRates.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
              <TableSortLabel
                active={sortColumn === 'code'}
                direction={sortColumn === 'code' ? sortOrder : 'asc'}
                onClick={handleSortByCode}>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                  Currency
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ py: { xs: 1.5, sm: 2 } }}>
              <TableSortLabel
                active={sortColumn === 'rate'}
                direction={sortColumn === 'rate' ? sortOrder : 'asc'}
                onClick={handleSortByRate}>
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                  Rate (1 {baseCurrency?.toUpperCase()} =)
                </Typography>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyRates.map(({ code, rate }) => (
            <CurrencyRateTableRow key={code} code={code} rate={rate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrencyRates;
