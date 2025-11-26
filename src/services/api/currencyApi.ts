import { apiGet } from './client';
import type { CurrenciesApiResponse, CurrencyRatesApiResponse } from '../../types/api.ts';

export const getCurrencies = (): Promise<CurrenciesApiResponse> =>
  apiGet('@latest/v1/currencies.json');

export const getCurrencyRates = (
  currency: string,
  date: string,
): Promise<CurrencyRatesApiResponse> => apiGet(`@${date}/v1/currencies/${currency}.json`);
