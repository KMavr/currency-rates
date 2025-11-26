import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useCurrencySort from '../useCurrencySort';
import useCurrencyRatesStore from '../../../../store/useCurrencyRatesStore';

describe('useCurrencySort', () => {
  const mockDates = [
    '2025-11-20',
    '2025-11-21',
    '2025-11-22',
    '2025-11-23',
    '2025-11-24',
    '2025-11-25',
    '2025-11-26',
  ];

  beforeEach(() => {
    useCurrencyRatesStore.setState({
      selectedCurrencies: ['usd', 'eur', 'jpy'],
      rates: {
        '2025-11-20': { usd: 2.1, eur: 1.1, jpy: 3.1 },
        '2025-11-21': { usd: 2.2, eur: 1.2, jpy: 3.2 },
        '2025-11-22': { usd: 2.3, eur: 1.3, jpy: 3.3 },
        '2025-11-23': { usd: 2.4, eur: 1.4, jpy: 3.4 },
        '2025-11-24': { usd: 2.5, eur: 1.5, jpy: 3.5 },
        '2025-11-25': { usd: 2.6, eur: 1.6, jpy: 3.6 },
        '2025-11-26': { usd: 2.7, eur: 1.7, jpy: 3.7 },
      },
    });
  });

  it('should return sorted currency rates by code ascending by default', () => {
    const { result } = renderHook(() => useCurrencySort());

    expect(result.current.currencyRates).toEqual([
      { code: 'EUR', dailyRates: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7] },
      { code: 'JPY', dailyRates: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7] },
      { code: 'USD', dailyRates: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7] },
    ]);
    expect(result.current.sortColumn).toBe('code');
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.dates).toEqual(mockDates);
  });

  it('should toggle sort order when same column is clicked', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSort('code');
    });

    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.currencyRates).toEqual([
      { code: 'USD', dailyRates: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7] },
      { code: 'JPY', dailyRates: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7] },
      { code: 'EUR', dailyRates: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7] },
    ]);
  });

  it('should sort by first date column ascending when clicked', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSort(0);
    });

    expect(result.current.sortColumn).toBe(0);
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.currencyRates).toEqual([
      { code: 'EUR', dailyRates: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7] },
      { code: 'USD', dailyRates: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7] },
      { code: 'JPY', dailyRates: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7] },
    ]);
  });

  it('should sort by date column descending when clicked twice', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSort(0);
    });

    act(() => {
      result.current.handleSort(0);
    });

    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.currencyRates).toEqual([
      { code: 'JPY', dailyRates: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7] },
      { code: 'USD', dailyRates: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7] },
      { code: 'EUR', dailyRates: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7] },
    ]);
  });

  it('should reset to ascending when switching columns', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSort('code');
    });
    expect(result.current.sortOrder).toBe('desc');

    act(() => {
      result.current.handleSort(0);
    });
    expect(result.current.sortColumn).toBe(0);
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should handle undefined rates by treating them as 0', () => {
    useCurrencyRatesStore.setState({
      selectedCurrencies: ['usd', 'eur', 'xxx'],
      rates: {
        '2025-11-20': { usd: 2.1, eur: 1.1 },
        '2025-11-21': { usd: 2.2, eur: 1.2 },
        '2025-11-22': { usd: 2.3, eur: 1.3 },
        '2025-11-23': { usd: 2.4, eur: 1.4 },
        '2025-11-24': { usd: 2.5, eur: 1.5 },
        '2025-11-25': { usd: 2.6, eur: 1.6 },
        '2025-11-26': { usd: 2.7, eur: 1.7 },
      },
    });

    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSort(0);
    });

    expect(result.current.currencyRates[0]).toEqual({
      code: 'XXX',
      dailyRates: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    });
    expect(result.current.currencyRates[1]).toEqual({
      code: 'EUR',
      dailyRates: [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
    });
    expect(result.current.currencyRates[2]).toEqual({
      code: 'USD',
      dailyRates: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
    });
  });
});
