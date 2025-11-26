import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyRates from '../CurrencyRates';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';

describe('CurrencyRates', () => {
  const mockRates = {
    '2024-11-20': { usd: 1.31, eur: 1.14, jpy: 205.5 },
    '2024-11-21': { usd: 1.32, eur: 1.15, jpy: 206.5 },
    '2024-11-22': { usd: 1.33, eur: 1.16, jpy: 207.5 },
    '2024-11-23': { usd: 1.34, eur: 1.17, jpy: 208.5 },
    '2024-11-24': { usd: 1.35, eur: 1.18, jpy: 209.5 },
    '2024-11-25': { usd: 1.36, eur: 1.19, jpy: 210.5 },
    '2024-11-26': { usd: 1.37, eur: 1.2, jpy: 211.5 },
  };

  beforeEach(() => {
    useCurrencyRatesStore.setState({
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy'],
      rates: mockRates,
      loading: false,
      error: null,
    });
  });

  it('should render table with currency rates', () => {
    const { container } = render(<CurrencyRates />);

    expect(screen.getByText('Currency')).toBeInTheDocument();
    expect(screen.getByText('20/11/2024')).toBeInTheDocument();
    expect(screen.getByText('21/11/2024')).toBeInTheDocument();
    expect(screen.getByText('22/11/2024')).toBeInTheDocument();
    expect(screen.getByText('23/11/2024')).toBeInTheDocument();
    expect(screen.getByText('24/11/2024')).toBeInTheDocument();
    expect(screen.getByText('25/11/2024')).toBeInTheDocument();
    expect(screen.getByText('26/11/2024')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('JPY')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should return null when no selected currencies', () => {
    useCurrencyRatesStore.setState({ selectedCurrencies: [] });

    const { container } = render(<CurrencyRates />);

    expect(container.firstChild).toBeNull();
  });

  it('should display rates with 4 decimal places', () => {
    render(<CurrencyRates />);

    expect(screen.getByText('1.3100')).toBeInTheDocument();
    expect(screen.getByText('1.3700')).toBeInTheDocument();
    expect(screen.getByText('1.1400')).toBeInTheDocument();
    expect(screen.getByText('1.2000')).toBeInTheDocument();
    expect(screen.getByText('205.5000')).toBeInTheDocument();
    expect(screen.getByText('211.5000')).toBeInTheDocument();
  });

  describe('sorting', () => {
    it('should sort by code ascending by default', () => {
      const { container } = render(<CurrencyRates />);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('EUR');
      expect(rows[1]).toHaveTextContent('JPY');
      expect(rows[2]).toHaveTextContent('USD');
    });

    it('should toggle code sort to descending when clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const codeHeader = screen.getByText('Currency');
      await user.click(codeHeader);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('USD');
      expect(rows[1]).toHaveTextContent('JPY');
      expect(rows[2]).toHaveTextContent('EUR');
    });

    it('should sort by first date column when clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const dateHeader = screen.getByText('20/11/2024');
      await user.click(dateHeader);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('EUR');
      expect(rows[1]).toHaveTextContent('USD');
      expect(rows[2]).toHaveTextContent('JPY');
    });

    it('should toggle date column sort to descending when clicked twice', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const dateHeader = screen.getByText('20/11/2024');
      await user.click(dateHeader);
      await user.click(dateHeader);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('JPY');
      expect(rows[1]).toHaveTextContent('USD');
      expect(rows[2]).toHaveTextContent('EUR');
    });

    it('should reset to ascending when switching columns', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const codeHeader = screen.getByText('Currency');
      await user.click(codeHeader);

      const dateHeader = screen.getByText('20/11/2024');
      await user.click(dateHeader);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('EUR');
      expect(rows[1]).toHaveTextContent('USD');
      expect(rows[2]).toHaveTextContent('JPY');
    });

    it('should show active sort indicator on code column by default', () => {
      const { container } = render(<CurrencyRates />);

      const codeLabel = container.querySelector('th:first-child .MuiTableSortLabel-root');
      expect(codeLabel).toHaveClass('Mui-active');
    });
  });

  describe('with undefined rates', () => {
    it('should handle currencies with undefined rates', () => {
      useCurrencyRatesStore.setState({
        selectedCurrencies: ['usd', 'eur', 'xxx'],
        rates: {
          '2024-11-20': { usd: 1.31, eur: 1.14 },
          '2024-11-21': { usd: 1.32, eur: 1.15 },
          '2024-11-22': { usd: 1.33, eur: 1.16 },
          '2024-11-23': { usd: 1.34, eur: 1.17 },
          '2024-11-24': { usd: 1.35, eur: 1.18 },
          '2024-11-25': { usd: 1.36, eur: 1.19 },
          '2024-11-26': { usd: 1.37, eur: 1.2 },
        },
      });

      render(<CurrencyRates />);

      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('EUR')).toBeInTheDocument();
      expect(screen.getByText('XXX')).toBeInTheDocument();
      const dashes = screen.getAllByText('-');
      expect(dashes).toHaveLength(7);
    });
  });
});
