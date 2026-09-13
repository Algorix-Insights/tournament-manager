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

export function buildDateFilter(
  period?: number,
  startDate?: string,
  endDate?: string
): DateFilterRange | undefined {
  const now = new Date();

  if (period === PeriodEnum.CURRENT_WEEK) {
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { gte: startOfWeek, lte: endOfWeek };
  }

  if (period === PeriodEnum.LAST_WEEK) {
    const dayOfWeek = now.getDay();
    const distanceToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) - 7;
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() + distanceToMonday);
    startOfLastWeek.setHours(0, 0, 0, 0);

    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23, 59, 59, 999);

    return { gte: startOfLastWeek, lte: endOfLastWeek };
  }

  if (period === PeriodEnum.CURRENT_MONTH) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { gte: startOfMonth, lte: endOfMonth };
  }

  if (period === PeriodEnum.LAST_MONTH) {
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    return { gte: startOfLastMonth, lte: endOfLastMonth };
  }

  if (period === PeriodEnum.CURRENT_SEMESTER) {
    const currentMonth = now.getMonth();
    const startMonth = currentMonth < 6 ? 0 : 6;
    const endMonth = currentMonth < 6 ? 5 : 11;

    const startOfSemester = new Date(now.getFullYear(), startMonth, 1, 0, 0, 0, 0);
    const endOfSemester = new Date(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999);
    return { gte: startOfSemester, lte: endOfSemester };
  }

  if (period === PeriodEnum.LAST_SEMESTER) {
    const currentMonth = now.getMonth();
    let startYear = now.getFullYear();
    let startMonth: number;
    let endMonth: number;

    if (currentMonth < 6) {
      startYear -= 1;
      startMonth = 6;
      endMonth = 11;
    } else {
      startMonth = 0;
      endMonth = 5;
    }

    const startOfSemester = new Date(startYear, startMonth, 1, 0, 0, 0, 0);
    const endOfSemester = new Date(startYear, endMonth + 1, 0, 23, 59, 59, 999);
    return { gte: startOfSemester, lte: endOfSemester };
  }

  if (period === PeriodEnum.CURRENT_YEAR) {
    const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    return { gte: startOfYear, lte: endOfYear };
  }

  if (period === PeriodEnum.LAST_YEAR) {
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
    const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
    return { gte: startOfLastYear, lte: endOfLastYear };
  }

  const range: DateFilterRange = {};
  if (startDate) {
    const start = new Date(startDate);
    if (!isNaN(start.getTime())) {
      range.gte = start;
    }
  }
  if (endDate) {
    const end = new Date(endDate);
    if (!isNaN(end.getTime())) {
      range.lte = end;
    }
  }

  if (range.gte || range.lte) {
    return range;
  }

  return undefined;
}
