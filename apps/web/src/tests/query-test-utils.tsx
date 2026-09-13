import type { ReactElement, ReactNode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/core/query/queryClient';

export function createTestQueryClient(): QueryClient {
  return createQueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function createQueryWrapper(client = createTestQueryClient()) {
  return function QueryWrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

export function renderWithQuery(
  ui: ReactElement,
  client = createTestQueryClient(),
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return {
    ...render(ui, { wrapper: createQueryWrapper(client), ...options }),
    queryClient: client,
  };
}
