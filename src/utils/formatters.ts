import type { Currency } from '../types/currencyTypes.ts';

export const formatCurrencies = (currencies: Record<string, string>): Currency[] =>
  Object.entries(currencies).map(([key, value]) => ({
    code: key,
    name: value,
  }));
