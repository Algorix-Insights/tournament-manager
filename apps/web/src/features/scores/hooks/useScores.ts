import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createScore } from '@/features/scores/api/scores';
import type { ScoreInput } from '@/features/scores/scores.types';

export function useCreateScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScoreInput) => createScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
}
