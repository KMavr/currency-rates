import { useState } from 'react';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore.ts';

type SortColumn = 'code' | 'rate';

function useCurrencySort() {
  const { selectedCurrencies, rates } = useCurrencyRatesStore();
  const [sortColumn, setSortColumn] = useState<SortColumn>('code');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const currencyRates = selectedCurrencies
    .map((currency) => ({
      code: currency.toUpperCase(),
      rate: rates[currency],
    }))
    .sort((a, b) => {
      if (sortColumn === 'code') {
        return sortOrder === 'asc' ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code);
      }
      const rateA = a.rate ?? 0;
      const rateB = b.rate ?? 0;
      return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    });

  const handleSort = (column: SortColumn) => () => {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSortByCode = handleSort('code');
  const handleSortByRate = handleSort('rate');

  return {
    handleSortByCode,
    handleSortByRate,
    currencyRates,
    sortColumn,
    sortOrder,
  };
}

export default useCurrencySort;
