import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createScore } from '@/features/scores/api/scores';
import type { ScoreInput } from '@/features/scores/scores.types';
import { rankingKeys } from '@/features/dashboard/hooks/useRanking';

export function useCreateScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScoreInput) => createScore(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: rankingKeys.all, refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: ['stats'], refetchType: 'active' }),
        queryClient.invalidateQueries({ queryKey: ['players'], refetchType: 'active' }),
      ]);
    },
  });
}
