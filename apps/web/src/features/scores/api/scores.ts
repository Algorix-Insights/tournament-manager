import api from '@/core/api/axios';
import type { ScoreInput } from '@/features/scores/scores.types';

export async function createScore(data: ScoreInput) {
  const response = await api.post('/scores', data);
  return response.data;
}
