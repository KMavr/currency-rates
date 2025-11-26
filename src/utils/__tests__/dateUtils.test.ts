import { calculatePreviousDates, formatDateApi, formatDayUI } from '../dateUtils.ts';
import { DATE_FORMAT_API, DATE_FORMAT_UI } from '../../model/date.ts';
import { expect } from 'vitest';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('calculatePreviousDates', () => {
    it('should return an array with dates 7 days back from the date passed', () => {
      const selectedDate = new Date('2025-01-04');

      expect(calculatePreviousDates(selectedDate)).toEqual([
        new Date('2024-12-29'),
        new Date('2024-12-30'),
        new Date('2024-12-31'),
        new Date('2025-01-01'),
        new Date('2025-01-02'),
        new Date('2025-01-03'),
        new Date('2025-01-04'),
      ]);
    });

    it('should return an array with dates as many days back from the date passed as passed', () => {
      const selectedDate = new Date('2025-01-04');

      expect(calculatePreviousDates(selectedDate, 3)).toEqual([
        new Date('2025-01-02'),
        new Date('2025-01-03'),
        new Date('2025-01-04'),
      ]);
    });
  });

  describe('formatDateApi', () => {
    it(`should format the date passed in the ${DATE_FORMAT_API} format`, () => {
      const selectedDate = new Date('2025-01-04');

      expect(formatDateApi(selectedDate)).toBe('2025-01-04');
    });
  });

  describe('formatDayUI', () => {
    it(`should format the date string in the ${DATE_FORMAT_UI} format`, () => {
      const dateString = '2025-01-04';

      expect(formatDayUI(dateString)).toBe('04/01/2025');
    });
  });
});
