import { useState } from 'react';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore.ts';

export type SortColumn = 'code' | number;

function useCurrencySort() {
  const { selectedCurrencies, rates } = useCurrencyRatesStore();
  const [sortColumn, setSortColumn] = useState<SortColumn>('code');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const dates = Object.keys(rates);

  const currencyRates = selectedCurrencies
    .map((currency) => {
      const dailyRates = dates.map((date) => rates[date]?.[currency]);
      return {
        code: currency.toUpperCase(),
        dailyRates,
      };
    })
    .sort((a, b) => {
      if (sortColumn === 'code') {
        return sortOrder === 'asc' ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code);
      }
      const rateA = a.dailyRates[sortColumn] ?? 0;
      const rateB = b.dailyRates[sortColumn] ?? 0;
      return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    });

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return {
    handleSort,
    currencyRates,
    sortColumn,
    sortOrder,
    dates,
  };
}

export default useCurrencySort;
