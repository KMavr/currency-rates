import { formatCurrencies } from '../formatters';

describe('formatCurrencies', () => {
  it('should convert currency object to Currency array', () => {
    const apiResponse = {
      eur: 'Euro',
      gbp: 'British Pound',
      usd: 'US Dollar',
    };

    const result = formatCurrencies(apiResponse);

    expect(result).toEqual([
      { code: 'gbp', name: 'British Pound' },
      { code: 'eur', name: 'Euro' },
      { code: 'usd', name: 'US Dollar' },
    ]);
  });

  it('should handle empty object', () => {
    const result = formatCurrencies({});
    expect(result).toEqual([]);
  });

  it('should handle single currency', () => {
    const apiResponse = { eur: 'Euro' };
    const result = formatCurrencies(apiResponse);

    expect(result).toEqual([{ code: 'eur', name: 'Euro' }]);
  });
});
