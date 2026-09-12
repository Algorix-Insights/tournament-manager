import { parsePaginationParams, formatPaginatedResponse } from '../src/core/utils/pagination.util';
import { expect, test, describe } from '@jest/globals';

describe('Pagination Utility Tests', () => {
  test('debe usar valores por defecto cuando no se envían parámetros', () => {
    const params = parsePaginationParams({});
    expect(params.pagina).toBe(1);
    expect(params.cantidadRegistros).toBe(20);
    expect(params.skip).toBe(0);
    expect(params.take).toBe(20);
  });

  test('debe parsear correctamente pagina y cantidadRegistros válidos', () => {
    const params = parsePaginationParams({ pagina: '3', cantidadRegistros: '25' });
    expect(params.pagina).toBe(3);
    expect(params.cantidadRegistros).toBe(25);
    expect(params.skip).toBe(50);
    expect(params.take).toBe(25);
  });

  test('debe manejar entradas inválidas o negativas cayendo en valores por defecto', () => {
    const params = parsePaginationParams({ pagina: '-5', cantidadRegistros: 'abc' }, 15);
    expect(params.pagina).toBe(1);
    expect(params.cantidadRegistros).toBe(15);
    expect(params.skip).toBe(0);
    expect(params.take).toBe(15);
  });

  test('formatPaginatedResponse debe retornar la estructura con data y ROW_COUNT', () => {
    const sampleData = [{ id: 1, nombre: 'Test' }];
    const response = formatPaginatedResponse(sampleData, 42);

    expect(response).toEqual({
      data: sampleData,
      ROW_COUNT: 42,
    });
  });
});
