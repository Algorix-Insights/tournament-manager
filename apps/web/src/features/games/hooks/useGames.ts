import { useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@/core/query/queryKeys';
import { fetchGames } from '@/features/games/api/games';

export const gamesKeys = createQueryKeys('games');

export function useGames() {
  return useQuery({
    queryKey: gamesKeys.list(),
    queryFn: fetchGames,
  });
}
