import { create } from 'zustand';
import type { CurrencyRatesStore, DayRate } from '../types/storeTypes.ts';
import { DEFAULT_CURRENCY, DEFAULT_SELECTED_CURRENCIES } from '../model/currencies.ts';
import { getCurrencies, getCurrencyRates } from '../services/api/currencyApi';
import { formatCurrencies } from '../utils/formatters';
import { calculatePreviousDates, formatDateApi } from '../utils/dateUtils.ts';

const useCurrencyRatesStore = create<CurrencyRatesStore>((set, get) => ({
  baseCurrency: DEFAULT_CURRENCY,
  selectedCurrencies: DEFAULT_SELECTED_CURRENCIES,
  selectedDate: new Date(),
  availableCurrencies: [],
  rates: {},
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
  fetchCurrencyRates: async () => {
    const { baseCurrency, selectedDate } = get();
    const previousDates = calculatePreviousDates(selectedDate).map(formatDateApi);
    const apiRequests = previousDates.map((date) => getCurrencyRates(baseCurrency, date));
    set({ loading: true, error: null });
    try {
      const responses = await Promise.allSettled(apiRequests);

      const rates = previousDates.reduce(
        (acc, date, index) => {
          const result = responses[index];

          if (result.status === 'fulfilled') {
            acc[date] = result.value[baseCurrency];
          }

          return acc;
        },
        {} as Record<string, DayRate>,
      );

      set({ rates, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch currency rates',
        loading: false,
      });
    }
  },
}));

export default useCurrencyRatesStore;
