/**
 * Helper to construct domain-shaped hierarchical query keys for TanStack Query.
 * Promotes consistent scoping and targeted invalidation across domains.
 *
 * Example:
 *   export const playersKeys = createQueryKeys<PlayerFilters>('players');
 *   playersKeys.all;          // ['players']
 *   playersKeys.lists();      // ['players', 'list']
 *   playersKeys.list(filter); // ['players', 'list', { filters }]
 *   playersKeys.details();    // ['players', 'detail']
 *   playersKeys.detail(id);   // ['players', 'detail', 42]
 */
export function createQueryKeys<TFilters = unknown>(domain: string) {
  return {
    all: [domain] as const,
    lists: () => [domain, 'list'] as const,
    list: (filters?: TFilters) => [domain, 'list', { filters }] as const,
    details: () => [domain, 'detail'] as const,
    detail: (id: string | number) => [domain, 'detail', id] as const,
  };
}
