import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useCurrencySort from '../useCurrencySort';
import useCurrencyRatesStore from '../../../../store/useCurrencyRatesStore';

describe('useCurrencySort', () => {
  beforeEach(() => {
    useCurrencyRatesStore.setState({
      selectedCurrencies: ['usd', 'eur', 'jpy'],
      rates: {
        usd: 2,
        eur: 1,
        jpy: 3,
      },
    });
  });

  it('should return sorted currency rates by code ascending by default', () => {
    const { result } = renderHook(() => useCurrencySort());

    expect(result.current.currencyRates).toEqual([
      { code: 'EUR', rate: 1 },
      { code: 'JPY', rate: 3 },
      { code: 'USD', rate: 2 },
    ]);
    expect(result.current.sortColumn).toBe('code');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should toggle sort order when same column is clicked', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSortByCode();
    });

    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.currencyRates).toEqual([
      { code: 'USD', rate: 2 },
      { code: 'JPY', rate: 3 },
      { code: 'EUR', rate: 1 },
    ]);
  });

  it('should sort by rate ascending when rate column is clicked', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSortByRate();
    });

    expect(result.current.sortColumn).toBe('rate');
    expect(result.current.sortOrder).toBe('asc');
    expect(result.current.currencyRates).toEqual([
      { code: 'EUR', rate: 1 },
      { code: 'USD', rate: 2 },
      { code: 'JPY', rate: 3 },
    ]);
  });

  it('should sort by rate descending when rate column is clicked twice', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSortByRate();
    });

    act(() => {
      result.current.handleSortByRate();
    });

    expect(result.current.sortOrder).toBe('desc');
    expect(result.current.currencyRates).toEqual([
      { code: 'JPY', rate: 3 },
      { code: 'USD', rate: 2 },
      { code: 'EUR', rate: 1 },
    ]);
  });

  it('should reset to ascending when switching columns', () => {
    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSortByCode();
    });
    expect(result.current.sortOrder).toBe('desc');

    act(() => {
      result.current.handleSortByRate();
    });
    expect(result.current.sortColumn).toBe('rate');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should handle undefined rates by treating them as 0', () => {
    useCurrencyRatesStore.setState({
      selectedCurrencies: ['usd', 'eur', 'xxx'],
      rates: {
        usd: 2,
        eur: 1,
      },
    });

    const { result } = renderHook(() => useCurrencySort());

    act(() => {
      result.current.handleSortByRate();
    });

    expect(result.current.currencyRates[0]).toEqual({ code: 'XXX', rate: undefined });
    expect(result.current.currencyRates[1]).toEqual({ code: 'EUR', rate: 1 });
    expect(result.current.currencyRates[2]).toEqual({ code: 'USD', rate: 2 });
  });
});
