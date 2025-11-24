import { create } from 'zustand';
import type { CurrencyRatesStore } from '../types/storeTypes.ts';
import { DEFAULT_CURRENCY } from '../model/currencies.ts';

const useCurrencyRatesStore = create<CurrencyRatesStore>((set) => ({
  baseCurrency: DEFAULT_CURRENCY,
  selectedCurrencies: [],
  selectedDate: new Date(),
  setBaseCurrency: (baseCurrency) => set({ baseCurrency }),
  setCurrencies: (currencies) => set({ selectedCurrencies: currencies }),
  setDate: (date) => set({ selectedDate: date }),
}));

export default useCurrencyRatesStore;
