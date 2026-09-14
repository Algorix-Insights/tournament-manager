import { expect, test, describe } from '@jest/globals';
import { createQueryClient, queryClient } from '@/core/query/queryClient';

describe('TanStack Query Client Configuration', () => {
  test('singleton queryClient is initialized with standard tournament defaults', () => {
    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(60000); // 1 minute
    expect(defaultOptions.queries?.gcTime).toBe(300000); // 5 minutes
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
    expect(defaultOptions.queries?.retry).toBe(1);
    expect(defaultOptions.mutations?.retry).toBe(0);
  });

  test('createQueryClient factory allows creating isolated instances for testing', () => {
    const customClient = createQueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
        },
      },
    });

    const defaultOptions = customClient.getDefaultOptions();
    expect(defaultOptions.queries?.retry).toBe(false);
    expect(defaultOptions.queries?.staleTime).toBe(0);
  });
});
