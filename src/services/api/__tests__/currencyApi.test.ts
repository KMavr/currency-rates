import { beforeEach, vi } from 'vitest';
import * as client from '../client.ts';
import { getCurrencies, getCurrencyRates } from '../currencyApi.ts';

describe('currency api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrencies', () => {
    it('should call apiGet with the correct endpoint', () => {
      const spy = vi.spyOn(client, 'apiGet');
      getCurrencies();
      expect(spy).toHaveBeenCalledWith('@latest/v1/currencies.json');
    });
  });

  describe('getCurrencyRates', () => {
    it('should call apiGet with the correct endpoint based on the arguments passed', () => {
      const spy = vi.spyOn(client, 'apiGet');
      getCurrencyRates('eur', '2025-11-26');
      expect(spy).toHaveBeenCalledWith('@2025-11-26/v1/currencies/eur.json');
    });
  });
});
