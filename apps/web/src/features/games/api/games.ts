import api from '@/core/api/axios';
import type { GamesResponse } from '@/features/games/games.types';

export async function fetchGames(): Promise<GamesResponse> {
  const response = await api.get<GamesResponse>('/games');
  return response.data;
}
