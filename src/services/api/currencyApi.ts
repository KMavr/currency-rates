import { apiGet } from './client';

export const getCurrencies = () => apiGet('/latest/v1/currencies.json');

export const getCurrencyRates = (currency: string, date: string) =>
  apiGet(`/${date}/v1/currencies/${currency}.json`);
