export enum PeriodEnum {
  CURRENT_WEEK = 1,
  LAST_WEEK = 2,
  CURRENT_MONTH = 3,
  LAST_MONTH = 4,
  CURRENT_SEMESTER = 5,
  LAST_SEMESTER = 6,
  CURRENT_YEAR = 7,
  LAST_YEAR = 8,
  CUSTOM = 9,
}

export interface DateFilterRange {
  gte?: Date;
  lte?: Date;
}

type PeriodHandler = (now: Date) => DateFilterRange;

function getWeekRange(now: Date, weekOffset = 0): DateFilterRange {
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
  const distanceToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) + weekOffset * 7;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + distanceToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return { gte: startOfWeek, lte: endOfWeek };
}

function getMonthRange(now: Date, monthOffset = 0): DateFilterRange {
  const year = now.getFullYear();
  const month = now.getMonth() + monthOffset;
  const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return { gte: startOfMonth, lte: endOfMonth };
}

function getCurrentSemesterRange(now: Date): DateFilterRange {
  const currentMonth = now.getMonth();
  const startMonth = currentMonth < 6 ? 0 : 6;
  const endMonth = currentMonth < 6 ? 5 : 11;

  const startOfSemester = new Date(now.getFullYear(), startMonth, 1, 0, 0, 0, 0);
  const endOfSemester = new Date(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999);

  return { gte: startOfSemester, lte: endOfSemester };
}

function getLastSemesterRange(now: Date): DateFilterRange {
  const currentMonth = now.getMonth();
  const isFirstHalf = currentMonth < 6;
  const year = isFirstHalf ? now.getFullYear() - 1 : now.getFullYear();
  const startMonth = isFirstHalf ? 6 : 0;
  const endMonth = isFirstHalf ? 11 : 5;

  const startOfSemester = new Date(year, startMonth, 1, 0, 0, 0, 0);
  const endOfSemester = new Date(year, endMonth + 1, 0, 23, 59, 59, 999);

  return { gte: startOfSemester, lte: endOfSemester };
}

function getYearRange(now: Date, yearOffset = 0): DateFilterRange {
  const year = now.getFullYear() + yearOffset;
  const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

  return { gte: startOfYear, lte: endOfYear };
}

function parseValidDate(dateString?: string): Date | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseCustomDateRange(
  startDate?: string,
  endDate?: string
): DateFilterRange | undefined {
  const gte = parseValidDate(startDate);
  const lte = parseValidDate(endDate);

  if (!gte && !lte) {
    return undefined;
  }

  const range: DateFilterRange = {};
  if (gte) range.gte = gte;
  if (lte) range.lte = lte;
  return range;
}

const PERIOD_HANDLERS: Partial<Record<PeriodEnum, PeriodHandler>> = {
  [PeriodEnum.CURRENT_WEEK]: (now) => getWeekRange(now, 0),
  [PeriodEnum.LAST_WEEK]: (now) => getWeekRange(now, -1),
  [PeriodEnum.CURRENT_MONTH]: (now) => getMonthRange(now, 0),
  [PeriodEnum.LAST_MONTH]: (now) => getMonthRange(now, -1),
  [PeriodEnum.CURRENT_SEMESTER]: getCurrentSemesterRange,
  [PeriodEnum.LAST_SEMESTER]: getLastSemesterRange,
  [PeriodEnum.CURRENT_YEAR]: (now) => getYearRange(now, 0),
  [PeriodEnum.LAST_YEAR]: (now) => getYearRange(now, -1),
};

export function buildDateFilter(
  period?: number,
  startDate?: string,
  endDate?: string
): DateFilterRange | undefined {
  const handler = period ? PERIOD_HANDLERS[period as PeriodEnum] : undefined;
  if (handler) {
    return handler(new Date());
  }

  return parseCustomDateRange(startDate, endDate);
}
