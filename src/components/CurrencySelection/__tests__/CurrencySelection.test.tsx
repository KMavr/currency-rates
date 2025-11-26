import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CurrencySelection from '../CurrencySelection';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';
import { DEFAULT_CURRENCY } from '../../../model/currencies.ts';

describe('CurrencySelection', () => {
  const mockCurrencies = [
    { code: 'usd', name: 'US Dollar' },
    { code: 'eur', name: 'Euro' },
    { code: 'gbp', name: 'British Pound' },
  ];

  beforeEach(() => {
    useCurrencyRatesStore.setState({
      availableCurrencies: [],
      baseCurrency: DEFAULT_CURRENCY,
      loading: false,
      error: null,
    });
  });

  it('should render autocomplete', () => {
    const { container } = render(<CurrencySelection />);
    expect(screen.getByLabelText('Currency')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call fetchAvailableCurrencies on mount', async () => {
    const fetchSpy = vi.spyOn(useCurrencyRatesStore.getState(), 'fetchAvailableCurrencies');

    render(<CurrencySelection />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should display selected currency from store', () => {
    useCurrencyRatesStore.setState({
      availableCurrencies: mockCurrencies,
      baseCurrency: 'eur',
    });

    render(<CurrencySelection />);

    expect(screen.getByDisplayValue('EUR - Euro')).toBeInTheDocument();
  });

  it('should handle empty currency name gracefully', () => {
    const currenciesWithEmpty = [{ code: 'btc', name: '' }];

    useCurrencyRatesStore.setState({
      availableCurrencies: currenciesWithEmpty,
      baseCurrency: 'btc',
    });

    render(<CurrencySelection />);

    expect(screen.getByDisplayValue('BTC')).toBeInTheDocument();
  });
});
