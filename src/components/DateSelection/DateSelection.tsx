import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import useCurrencyRatesStore from '../../store/useCurrencyRatesStore';
import { DATE_FORMAT_UI, MAX_DAYS_BACK } from '../../model/date.ts';

function DateSelection() {
  const { selectedDate, setDate } = useCurrencyRatesStore();

  const today = dayjs();
  const minDate = today.subtract(MAX_DAYS_BACK, 'day');

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate.toDate());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={dayjs(selectedDate)}
        onChange={handleDateChange}
        format={DATE_FORMAT_UI}
        minDate={minDate}
        maxDate={today}
        slotProps={{
          textField: {
            'data-testid': 'date-picker',
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default DateSelection;
