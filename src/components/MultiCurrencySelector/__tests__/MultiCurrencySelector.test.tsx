import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MultiCurrencySelector from '../MultiCurrencySelector';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';

describe('MultiCurrencySelector', () => {
  const mockCurrencies = [
    { code: 'usd', name: 'US Dollar' },
    { code: 'eur', name: 'Euro' },
    { code: 'gbp', name: 'British Pound' },
    { code: 'jpy', name: 'Japanese Yen' },
    { code: 'aud', name: 'Australian Dollar' },
    { code: 'cad', name: 'Canadian Dollar' },
    { code: 'chf', name: 'Swiss Franc' },
  ];

  const mockFetchCurrencyRates = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useCurrencyRatesStore.setState({
      availableCurrencies: mockCurrencies,
      baseCurrency: 'gbp',
      selectedDate: new Date('2024-03-15'),
      rates: {},
      loading: false,
      error: null,
      fetchCurrencyRates: mockFetchCurrencyRates,
    });
  });

  describe('with 3 chips (minimum)', () => {
    beforeEach(() => {
      useCurrencyRatesStore.setState({
        selectedCurrencies: ['usd', 'eur', 'gbp'],
      });
    });

    it('should render and match snapshot', () => {
      const { container } = render(<MultiCurrencySelector />);
      expect(container).toMatchSnapshot();
    });

    it('should render chips without delete buttons', () => {
      const { container } = render(<MultiCurrencySelector />);

      const chips = container.querySelectorAll('.MuiChip-root');
      expect(chips.length).toBe(3);

      const deleteIcons = screen.queryAllByTestId('CancelIcon');
      expect(deleteIcons).toHaveLength(0);
    });

    it('should allow autocomplete to open', () => {
      const { container } = render(<MultiCurrencySelector />);

      const autocomplete = container.querySelector('.MuiAutocomplete-root');
      expect(autocomplete).toBeInTheDocument();
    });
  });

  describe('with 5 chips (middle)', () => {
    beforeEach(() => {
      useCurrencyRatesStore.setState({
        selectedCurrencies: ['usd', 'eur', 'gbp', 'jpy', 'aud'],
      });
    });

    it('should render and match snapshot', () => {
      const { container } = render(<MultiCurrencySelector />);
      expect(container).toMatchSnapshot();
    });

    it('should render chips with delete buttons (limited to 4)', () => {
      render(<MultiCurrencySelector />);

      const deleteIcons = screen.queryAllByTestId('CancelIcon');
      expect(deleteIcons).toHaveLength(4);
    });

    it('should display correct helper text', () => {
      render(<MultiCurrencySelector />);

      expect(screen.getByText(/5\/7 selected/i)).toBeInTheDocument();
      expect(screen.getByText(/minimum 3/i)).toBeInTheDocument();
    });
  });

  describe('with 7 chips (maximum)', () => {
    beforeEach(() => {
      useCurrencyRatesStore.setState({
        selectedCurrencies: ['usd', 'eur', 'gbp', 'jpy', 'aud', 'cad', 'chf'],
      });
    });

    it('should render and match snapshot', () => {
      const { container } = render(<MultiCurrencySelector />);
      expect(container).toMatchSnapshot();
    });

    it('should display maximum reached message', () => {
      render(<MultiCurrencySelector />);

      expect(screen.getByText(/Maximum 7 currencies selected/i)).toBeInTheDocument();
    });

    it('should render chips with delete buttons (limited to 4)', () => {
      render(<MultiCurrencySelector />);

      const deleteIcons = screen.queryAllByTestId('CancelIcon');
      expect(deleteIcons).toHaveLength(4);
    });

    it('should not open autocomplete when onOpen is triggered at maximum', async () => {
      const user = userEvent.setup();
      render(<MultiCurrencySelector />);

      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');

      await user.click(input);

      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('data fetching', () => {
    beforeEach(() => {
      useCurrencyRatesStore.setState({
        selectedCurrencies: ['usd', 'eur', 'gbp'],
      });
    });

    it('should fetch currency rates on mount when baseCurrency and selectedDate exist', async () => {
      render(<MultiCurrencySelector />);

      await waitFor(() => {
        expect(mockFetchCurrencyRates).toHaveBeenCalledTimes(1);
      });
    });

    it('should fetch currency rates when baseCurrency changes', async () => {
      const { rerender } = render(<MultiCurrencySelector />);

      await act(async () => {
        useCurrencyRatesStore.setState({ baseCurrency: 'usd' });
        rerender(<MultiCurrencySelector />);
      });

      await waitFor(() => {
        expect(mockFetchCurrencyRates).toHaveBeenCalledTimes(2);
      });
    });

    it('should fetch currency rates when selectedDate changes', async () => {
      const { rerender } = render(<MultiCurrencySelector />);

      await act(async () => {
        useCurrencyRatesStore.setState({ selectedDate: new Date('2024-03-16') });
        rerender(<MultiCurrencySelector />);
      });

      await waitFor(() => {
        expect(mockFetchCurrencyRates).toHaveBeenCalledTimes(2);
      });
    });

    it('should not fetch rates when baseCurrency is missing', () => {
      useCurrencyRatesStore.setState({ baseCurrency: '' });

      render(<MultiCurrencySelector />);

      expect(mockFetchCurrencyRates).not.toHaveBeenCalled();
    });
  });
});
