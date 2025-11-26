import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyRates from '../CurrencyRates';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';

describe('CurrencyRates', () => {
  const mockRates = {
    usd: 1.31,
    eur: 1.14,
    jpy: 205.5,
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
    expect(screen.getByText(/Rate \(1 GBP =\)/i)).toBeInTheDocument();
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
    expect(screen.getByText('1.1400')).toBeInTheDocument();
    expect(screen.getByText('205.5000')).toBeInTheDocument();
  });

  it('should display base currency in header', () => {
    render(<CurrencyRates />);

    expect(screen.getByText(/Rate \(1 GBP =\)/i)).toBeInTheDocument();
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

    it('should sort by rate when rate header is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const rateHeader = screen.getByText(/Rate \(1 GBP =\)/i);
      await user.click(rateHeader);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveTextContent('EUR');
      expect(rows[1]).toHaveTextContent('USD');
      expect(rows[2]).toHaveTextContent('JPY');
    });

    it('should toggle rate sort to descending when clicked twice', async () => {
      const user = userEvent.setup();
      const { container } = render(<CurrencyRates />);

      const rateHeader = screen.getByText(/Rate \(1 GBP =\)/i);
      await user.click(rateHeader);
      await user.click(rateHeader);

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

      const rateHeader = screen.getByText(/Rate \(1 GBP =\)/i);
      await user.click(rateHeader);

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
        rates: { usd: 1.31, eur: 1.14 },
      });

      render(<CurrencyRates />);

      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('EUR')).toBeInTheDocument();
      expect(screen.getByText('XXX')).toBeInTheDocument();
      expect(screen.getByText('-')).toBeInTheDocument();
    });
  });
});
