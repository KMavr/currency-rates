import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';
import useCurrencyRatesStore from '../../../../store/useCurrencyRatesStore.ts';

function CurrencyRatesLoadingState() {
  const { selectedCurrencies } = useCurrencyRatesStore();

  return (
    <TableContainer component={Paper} elevation={2} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableBody>
          {[...Array(selectedCurrencies.length + 1)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(8)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton variant="text" width="100%" height={30} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrencyRatesLoadingState;
