import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQueryKeys } from '@/core/query/queryKeys';
import { createGame, deleteGame, fetchGames, updateGame } from '@/features/games/api/games';
import type { GameInput } from '@/features/games/games.types';

export const gamesKeys = createQueryKeys('games');

export function useGames(search = '') {
  return useQuery({
    queryKey: gamesKeys.list({ search }),
    queryFn: () => fetchGames(search),
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gamesKeys.all }),
  });
}

export function useUpdateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<GameInput> }) => updateGame(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gamesKeys.all }),
  });
}

export function useDeleteGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gamesKeys.all }),
  });
}
