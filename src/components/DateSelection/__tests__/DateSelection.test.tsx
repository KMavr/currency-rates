import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { vi } from 'vitest';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';
import DateSelection from '../DateSelection';

describe('DateSelection', () => {
  const MOCK_DATE = new Date('2025-01-01T12:00:00.000Z');

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_DATE);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    useCurrencyRatesStore.setState({ selectedDate: new Date() });
  });

  it('should render a date picker', () => {
    const { container } = render(<DateSelection />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display the date from store', () => {
    const testDate = dayjs().subtract(5, 'day').toDate();
    useCurrencyRatesStore.setState({ selectedDate: testDate });

    render(<DateSelection />);

    const formattedDate = dayjs(testDate).format('DD/MM/YYYY');
    expect(screen.getByDisplayValue(formattedDate)).toBeInTheDocument();
  });

  it('should initialize store with today', () => {
    render(<DateSelection />);

    const storeDate = useCurrencyRatesStore.getState().selectedDate;
    const today = dayjs().startOf('day');

    expect(dayjs(storeDate).startOf('day').isSame(today)).toBe(true);
  });
});
