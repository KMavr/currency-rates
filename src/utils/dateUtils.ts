import dayjs from 'dayjs';
import { DATE_FORMAT_UI, DATE_FORMAT_API } from '../model/date.ts';

export const calculatePreviousDates = (date: Date, daysBack = 7): Date[] =>
  Array.from(
    { length: daysBack },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - i),
  ).reverse();

export const formatDateApi = (date: Date) => dayjs(date).format(DATE_FORMAT_API);

export const formatDayUI = (date: string) => dayjs(date).format(DATE_FORMAT_UI);
