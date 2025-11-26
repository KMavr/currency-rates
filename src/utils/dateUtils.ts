import dayjs from 'dayjs';
import { DATE_FORMAT_UI } from '../model/date.ts';

export const calculatePreviousDates = (date: Date, daysBack = 7): Date[] =>
  Array.from(
    { length: daysBack },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - i),
  ).reverse();

export const formatDateISOString = (date: Date) => date.toISOString().split('T')[0];

export const formatDayUI = (date: string) => dayjs(date).format(DATE_FORMAT_UI);
