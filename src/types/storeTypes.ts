import type { Currency } from './currencyTypes.ts';

export type DayRate = Record<string, number>;

export interface CurrencyRatesStore {
  baseCurrency: Currency['code'];
  selectedCurrencies: Currency['code'][];
  selectedDate: Date;
  availableCurrencies: Currency[];
  rates: Record<string, DayRate>;
  loading: boolean;
  error: string | null;
  setBaseCurrency: (baseCurrency: string) => void;
  setSelectedCurrencies: (currencies: string[]) => void;
  setDate: (date: Date) => void;
  fetchAvailableCurrencies: () => Promise<void>;
  fetchCurrencyRates: () => Promise<void>;
}
