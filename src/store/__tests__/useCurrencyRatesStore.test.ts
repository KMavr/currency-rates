import { describe, it, expect, beforeEach, vi } from 'vitest';
import useCurrencyRatesStore from '../useCurrencyRatesStore';
import * as currencyApi from '../../services/api/currencyApi';

vi.mock('../../services/api/currencyApi');

describe('useCurrencyRatesStore', () => {
  beforeEach(() => {
    useCurrencyRatesStore.setState({
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy'],
      selectedDate: new Date('2024-11-26'),
      availableCurrencies: [],
      rates: {},
      loading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct default values', () => {
      const state = useCurrencyRatesStore.getState();

      expect(state.baseCurrency).toBe('gbp');
      expect(state.selectedCurrencies).toEqual(['usd', 'eur', 'jpy']);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe('setBaseCurrency', () => {
    it('should update base currency', () => {
      const { setBaseCurrency } = useCurrencyRatesStore.getState();

      setBaseCurrency('usd');

      expect(useCurrencyRatesStore.getState().baseCurrency).toBe('usd');
    });
  });

  describe('setDate', () => {
    it('should update selected date', () => {
      const { setDate } = useCurrencyRatesStore.getState();
      const newDate = new Date('2024-12-01');

      setDate(newDate);

      expect(useCurrencyRatesStore.getState().selectedDate).toEqual(newDate);
    });
  });

  describe('setSelectedCurrencies', () => {
    it('should update selected currencies', () => {
      const { setSelectedCurrencies } = useCurrencyRatesStore.getState();

      setSelectedCurrencies(['usd', 'cad']);

      expect(useCurrencyRatesStore.getState().selectedCurrencies).toEqual(['usd', 'cad']);
    });

    it('should replace all currencies', () => {
      const { setSelectedCurrencies } = useCurrencyRatesStore.getState();

      setSelectedCurrencies(['aud', 'nzd', 'chf']);

      expect(useCurrencyRatesStore.getState().selectedCurrencies).toEqual(['aud', 'nzd', 'chf']);
    });
  });

  describe('fetchAvailableCurrencies', () => {
    it('should fetch and format available currencies', async () => {
      const mockResponse = {
        eur: 'Euro',
        usd: 'US Dollar',
        jpy: 'Japanese Yen',
      };

      vi.mocked(currencyApi.getCurrencies).mockResolvedValue(mockResponse);

      const { fetchAvailableCurrencies } = useCurrencyRatesStore.getState();
      await fetchAvailableCurrencies();

      const state = useCurrencyRatesStore.getState();

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.availableCurrencies).toHaveLength(3);
      expect(state.availableCurrencies[0]).toEqual({ code: 'eur', name: 'Euro' });
      expect(currencyApi.getCurrencies).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch error', async () => {
      vi.mocked(currencyApi.getCurrencies).mockRejectedValue(new Error('Network error'));

      const { fetchAvailableCurrencies } = useCurrencyRatesStore.getState();
      await fetchAvailableCurrencies();

      const state = useCurrencyRatesStore.getState();

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
      expect(state.availableCurrencies).toEqual([]);
    });
  });

  describe('fetchCurrencyRates', () => {
    it('should fetch rates for 7 days and update state', async () => {
      const mockResponse = {
        gbp: {
          usd: 1.31,
          eur: 1.14,
          jpy: 205.5,
        },
      };

      vi.mocked(currencyApi.getCurrencyRates).mockResolvedValue(mockResponse);

      const { fetchCurrencyRates } = useCurrencyRatesStore.getState();
      await fetchCurrencyRates();

      const state = useCurrencyRatesStore.getState();

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(Object.keys(state.rates)).toHaveLength(7);
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledTimes(7);
      expect(state.rates['2024-11-26']).toEqual(mockResponse.gbp);
      expect(state.rates['2024-11-25']).toEqual(mockResponse.gbp);
      expect(state.rates['2024-11-20']).toEqual(mockResponse.gbp);
    });

    it('should set loading state while fetching', async () => {
      vi.mocked(currencyApi.getCurrencyRates).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ gbp: {} }), 100)),
      );

      const { fetchCurrencyRates } = useCurrencyRatesStore.getState();
      const fetchPromise = fetchCurrencyRates();

      expect(useCurrencyRatesStore.getState().loading).toBe(true);

      await fetchPromise;

      expect(useCurrencyRatesStore.getState().loading).toBe(false);
    });

    it('should handle partial failures gracefully', async () => {
      const mockSuccessResponse = {
        gbp: {
          usd: 1.31,
          eur: 1.14,
          jpy: 205.5,
        },
      };

      let callCount = 0;
      vi.mocked(currencyApi.getCurrencyRates).mockImplementation(() => {
        callCount++;
        // Fail on the 3rd and 5th calls
        if (callCount === 3 || callCount === 5) {
          return Promise.reject(new Error('API Error'));
        }
        return Promise.resolve(mockSuccessResponse);
      });

      const { fetchCurrencyRates } = useCurrencyRatesStore.getState();
      await fetchCurrencyRates();

      const state = useCurrencyRatesStore.getState();

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      // Should have 5 successful dates out of 7
      const successfulDates = Object.keys(state.rates).filter(
        (date) => Object.keys(state.rates[date]).length > 0,
      );
      expect(successfulDates).toHaveLength(5);
    });

    it('should handle complete failure', async () => {
      vi.mocked(currencyApi.getCurrencyRates).mockRejectedValue(new Error('Network error'));

      const { fetchCurrencyRates } = useCurrencyRatesStore.getState();

      // Since we use Promise.allSettled, complete failure won't throw but will result in empty rates
      await fetchCurrencyRates();

      const state = useCurrencyRatesStore.getState();

      expect(state.loading).toBe(false);
      // All requests failed, so all date entries should be empty
      Object.values(state.rates).forEach((dayRate) => {
        expect(Object.keys(dayRate)).toHaveLength(0);
      });
    });

    it('should use correct date range', async () => {
      const mockResponse = { gbp: { usd: 1.31 } };
      vi.mocked(currencyApi.getCurrencyRates).mockResolvedValue(mockResponse);

      useCurrencyRatesStore.setState({
        selectedDate: new Date('2024-11-26'),
      });

      const { fetchCurrencyRates } = useCurrencyRatesStore.getState();
      await fetchCurrencyRates();

      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-20');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-21');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-22');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-23');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-24');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-25');
      expect(currencyApi.getCurrencyRates).toHaveBeenCalledWith('gbp', '2024-11-26');
    });
  });
});
