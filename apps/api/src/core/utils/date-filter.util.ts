export enum PeriodoEnum {
  SEMANA_ACTUAL = 1,
  SEMANA_PASADA = 2,
  MES_ACTUAL = 3,
  MES_PASADO = 4,
  SEMESTRE_ACTUAL = 5,
  SEMESTRE_PASADO = 6,
  ANO_ACTUAL = 7,
  ANO_PASADO = 8,
  PERSONALIZADO = 9,
}

export interface DateFilterRange {
  gte?: Date;
  lte?: Date;
}

export function buildDateFilter(
  periodo?: number,
  fechaInicio?: string,
  fechaFin?: string
): DateFilterRange | undefined {
  const now = new Date();
  
  if (periodo === PeriodoEnum.SEMANA_ACTUAL) {
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
    const distanceToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { gte: startOfWeek, lte: endOfWeek };
  }

  if (periodo === PeriodoEnum.SEMANA_PASADA) {
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

  if (periodo === PeriodoEnum.MES_ACTUAL) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { gte: startOfMonth, lte: endOfMonth };
  }

  if (periodo === PeriodoEnum.MES_PASADO) {
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    return { gte: startOfLastMonth, lte: endOfLastMonth };
  }

  if (periodo === PeriodoEnum.SEMESTRE_ACTUAL) {
    const currentMonth = now.getMonth(); // 0-11
    const startMonth = currentMonth < 6 ? 0 : 6;
    const endMonth = currentMonth < 6 ? 5 : 11;

    const startOfSemester = new Date(now.getFullYear(), startMonth, 1, 0, 0, 0, 0);
    const endOfSemester = new Date(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999);
    return { gte: startOfSemester, lte: endOfSemester };
  }

  if (periodo === PeriodoEnum.SEMESTRE_PASADO) {
    const currentMonth = now.getMonth();
    let startYear = now.getFullYear();
    let startMonth: number;
    let endMonth: number;

    if (currentMonth < 6) {
      // Current is Jan-Jun, last semester is Jul-Dec of previous year
      startYear -= 1;
      startMonth = 6;
      endMonth = 11;
    } else {
      // Current is Jul-Dec, last semester is Jan-Jun of current year
      startMonth = 0;
      endMonth = 5;
    }

    const startOfSemester = new Date(startYear, startMonth, 1, 0, 0, 0, 0);
    const endOfSemester = new Date(startYear, endMonth + 1, 0, 23, 59, 59, 999);
    return { gte: startOfSemester, lte: endOfSemester };
  }

  if (periodo === PeriodoEnum.ANO_ACTUAL) {
    const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    return { gte: startOfYear, lte: endOfYear };
  }

  if (periodo === PeriodoEnum.ANO_PASADO) {
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
    const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
    return { gte: startOfLastYear, lte: endOfLastYear };
  }

  // Personalizado o con fechas directas (periodo === 9 o sin periodo especificado)
  const range: DateFilterRange = {};
  if (fechaInicio) {
    const start = new Date(fechaInicio);
    if (!isNaN(start.getTime())) {
      range.gte = start;
    }
  }
  if (fechaFin) {
    const end = new Date(fechaFin);
    if (!isNaN(end.getTime())) {
      range.lte = end;
    }
  }

  if (range.gte || range.lte) {
    return range;
  }

  return undefined;
}
