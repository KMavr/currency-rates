export interface CurrencyRatesStore {
  baseCurrency: string;
  selectedCurrencies: string[];
  selectedDate: Date;
  setBaseCurrency: (baseCurrency: string) => void;
  setCurrencies: (currencies: string[]) => void;
  setDate: (date: Date) => void;
}
