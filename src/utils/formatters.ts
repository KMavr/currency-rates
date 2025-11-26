import type { Currency } from '../types/currencyTypes.ts';

export const formatCurrencies = (currencies: Record<string, string>): Currency[] =>
  Object.entries(currencies)
    .map(([key, value]) => ({
      code: key,
      name: value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export const getCurrencyLabel = (currency: Currency): string =>
  `${currency.code.toUpperCase()}${currency.name ? ` - ${currency.name}` : ''}`;

export const isCurrencyEqual = (option: Currency, value: Currency): boolean =>
  option.code === value.code;
