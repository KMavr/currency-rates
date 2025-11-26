import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { formatDayUI } from '../../../../utils/dateUtils';
import type { SortColumn } from '../../hooks/useCurrencySort';

interface CurrencyRateTableHeaderProps {
  dates: string[];
  sortColumn: SortColumn;
  sortOrder: 'asc' | 'desc';
  handleSort: (column: SortColumn) => void;
}

function CurrencyRateTableHeader({
  dates,
  sortColumn,
  sortOrder,
  handleSort,
}: CurrencyRateTableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          sx={{
            py: { xs: 1.5, sm: 2 },
            borderRight: 1,
            borderColor: 'divider',
          }}>
          <TableSortLabel
            active={sortColumn === 'code'}
            direction={sortColumn === 'code' ? sortOrder : 'asc'}
            onClick={() => handleSort('code')}
            sx={{ justifyContent: 'center' }}>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              fontSize={{ xs: '0.875rem', sm: '1rem' }}>
              Currency
            </Typography>
          </TableSortLabel>
        </TableCell>
        {dates.map((date, index) => (
          <TableCell
            key={date}
            align="center"
            sx={{
              py: { xs: 1.5, sm: 2 },
            }}>
            <TableSortLabel
              active={sortColumn === index}
              direction={sortColumn === index ? sortOrder : 'asc'}
              onClick={() => handleSort(index)}
              sx={{ justifyContent: 'center' }}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                {formatDayUI(date)}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CurrencyRateTableHeader;
