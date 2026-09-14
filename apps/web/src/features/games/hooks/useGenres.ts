import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@/core/query/queryKeys';
import { fetchGenres } from '@/features/games/api/games';

export const genresKeys = createQueryKeys('genres');

export function useGenres() {
  return useQuery({
    queryKey: genresKeys.list(),
    queryFn: fetchGenres,
  });
}
