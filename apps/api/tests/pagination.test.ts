import { parsePaginationParams, formatPaginatedResponse } from '@/core/utils/pagination.util';
import { expect, test, describe } from '@jest/globals';

describe('Pagination Utility Tests', () => {
  test('should use defaults when no parameters are provided', () => {
    const params = parsePaginationParams({});
    expect(params.page).toBe(1);
    expect(params.limit).toBe(20);
    expect(params.skip).toBe(0);
    expect(params.take).toBe(20);
  });

  test('should correctly parse valid page and limit parameters', () => {
    const params = parsePaginationParams({ page: '3', limit: '25' });
    expect(params.page).toBe(3);
    expect(params.limit).toBe(25);
    expect(params.skip).toBe(50);
    expect(params.take).toBe(25);
  });

  test('should support legacy pagina and cantidadRegistros parameters', () => {
    const params = parsePaginationParams({ pagina: '2', cantidadRegistros: '10' });
    expect(params.page).toBe(2);
    expect(params.limit).toBe(10);
    expect(params.skip).toBe(10);
    expect(params.take).toBe(10);
  });

  test('should handle invalid or negative values by falling back to defaults', () => {
    const params = parsePaginationParams({ page: '-5', limit: 'abc' }, 15);
    expect(params.page).toBe(1);
    expect(params.limit).toBe(15);
    expect(params.skip).toBe(0);
    expect(params.take).toBe(15);
  });

  test('formatPaginatedResponse should return data and ROW_COUNT', () => {
    const sampleData = [{ id: 1, name: 'Test' }];
    const response = formatPaginatedResponse(sampleData, 42);

    expect(response).toEqual({
      data: sampleData,
      ROW_COUNT: 42,
      totalRecords: 42,
    });
  });
});
