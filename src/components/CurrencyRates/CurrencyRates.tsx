import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import useCurrencySort from './hooks/useCurrencySort';
import { CurrencyRateTableHeader, CurrencyRateTableRow } from './components';

function CurrencyRates() {
  const { handleSort, currencyRates, sortColumn, sortOrder, dates } = useCurrencySort();

  if (currencyRates.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} elevation={2} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <CurrencyRateTableHeader
          dates={dates}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
        <TableBody>
          {currencyRates.map(({ code, dailyRates }) => (
            <CurrencyRateTableRow key={code} code={code} dailyRates={dailyRates} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrencyRates;
