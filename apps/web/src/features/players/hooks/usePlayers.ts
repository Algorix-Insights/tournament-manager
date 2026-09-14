import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQueryKeys } from '@/core/query/queryKeys';
import { createPlayer, fetchPlayer, fetchPlayers } from '@/features/players/api/players';
import type { PlayerInput } from '@/features/players/players.types';

export const playersKeys = createQueryKeys('players');

export function usePlayers(search = '', page = 1, limit = 20) {
  return useQuery({
    queryKey: playersKeys.list({ search, page, limit }),
    queryFn: () => fetchPlayers(search, page, limit),
  });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PlayerInput) => createPlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playersKeys.all });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
}

export function usePlayer(id: number, enabled: boolean) {
  return useQuery({
    queryKey: playersKeys.detail(id),
    queryFn: () => fetchPlayer(id),
    enabled,
  });
}
