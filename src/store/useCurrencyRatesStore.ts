import { create } from 'zustand';
import type { CurrencyRatesStore } from '../types/storeTypes.ts';
import { DEFAULT_CURRENCY, DEFAULT_SELECTED_CURRENCIES } from '../model/currencies.ts';
import { getCurrencies } from '../services/api/currencyApi';
import { formatCurrencies } from '../utils/formatters';

const useCurrencyRatesStore = create<CurrencyRatesStore>((set) => ({
  baseCurrency: DEFAULT_CURRENCY,
  selectedCurrencies: DEFAULT_SELECTED_CURRENCIES,
  selectedDate: new Date(),
  availableCurrencies: [],
  loading: false,
  error: null,
  setBaseCurrency: (baseCurrency) => set({ baseCurrency }),
  setSelectedCurrencies: (currencies) => set({ selectedCurrencies: currencies }),
  setDate: (date) => set({ selectedDate: date }),
  fetchAvailableCurrencies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getCurrencies();
      const formatted = formatCurrencies(response);
      set({ availableCurrencies: formatted, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch currencies',
        loading: false,
      });
    }
  },
}));

export default useCurrencyRatesStore;
