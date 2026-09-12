export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  take: number;
  pagina?: number;
  cantidadRegistros?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  ROW_COUNT: number;
  totalRecords?: number;
}

/**
 * Parses and validates pagination parameters from req.query.
 * Supports English 'page' and 'limit' as primary parameters, with legacy fallback.
 * @param query Express req.query object
 * @param defaultLimit Default page limit (default 20)
 */
export function parsePaginationParams(
  query: any,
  defaultLimit: number = 20
): PaginationParams {
  const rawPage = query?.page ?? query?.pagina;
  const rawLimit = query?.limit ?? query?.cantidadRegistros;

  const pageNum = parseInt(rawPage, 10);
  const limitNum = parseInt(rawLimit, 10);

  const page = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
  const limit = !isNaN(limitNum) && limitNum > 0 ? limitNum : defaultLimit;

  const skip = (page - 1) * limit;
  const take = limit;

  return {
    page,
    limit,
    skip,
    take,
    pagina: page,
    cantidadRegistros: limit,
  };
}

/**
 * Formats data and row count into the expected response structure.
 */
export function formatPaginatedResponse<T>(
  data: T[],
  totalRecords: number
): PaginatedResponse<T> {
  return {
    data,
    ROW_COUNT: totalRecords,
    totalRecords,
  };
}
