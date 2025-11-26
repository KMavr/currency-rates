import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore.ts';
import CurrencyRateTableRow from './components/CurrencyRateTableRow/CurrencyRateTableRow.tsx';

function CurrencyRates() {
  const { selectedCurrencies, rates, baseCurrency } = useCurrencyRatesStore();

  const currencyRates = selectedCurrencies.map((currency) => ({
    code: currency.toUpperCase(),
    rate: rates[currency],
  }));

  if (currencyRates.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                Currency
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ py: { xs: 1.5, sm: 2 } }}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                Rate (1 {baseCurrency?.toUpperCase()} =)
              </Typography>
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
