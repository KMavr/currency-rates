import type { Currency } from './currencyTypes.ts';

export interface CurrencyRatesStore {
  baseCurrency: string;
  selectedCurrencies: string[];
  selectedDate: Date;
  availableCurrencies: Currency[];
  loading: boolean;
  error: string | null;
  setBaseCurrency: (baseCurrency: string) => void;
  setSelectedCurrencies: (currencies: string[]) => void;
  setDate: (date: Date) => void;
  fetchAvailableCurrencies: () => Promise<void>;
}
