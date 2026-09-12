export interface PaginationParams {
  pagina: number;
  cantidadRegistros: number;
  skip: number;
  take: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  ROW_COUNT: number;
}

/**
 * Parsea y valida los parámetros de paginación de req.query.
 * @param query Objeto req.query de Express
 * @param defaultLimit Límite por defecto (por defecto 20)
 */
export function parsePaginationParams(
  query: any,
  defaultLimit: number = 20
): PaginationParams {
  const pageRaw = parseInt(query?.pagina, 10);
  const limitRaw = parseInt(query?.cantidadRegistros, 10);

  const pagina = !isNaN(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const cantidadRegistros = !isNaN(limitRaw) && limitRaw > 0 ? limitRaw : defaultLimit;

  const skip = (pagina - 1) * cantidadRegistros;
  const take = cantidadRegistros;

  return {
    pagina,
    cantidadRegistros,
    skip,
    take,
  };
}

/**
 * Formatea los datos y el conteo de filas en el objeto de respuesta esperado.
 */
export function formatPaginatedResponse<T>(
  data: T[],
  totalRecords: number
): PaginatedResponse<T> {
  return {
    data,
    ROW_COUNT: totalRecords,
  };
}
