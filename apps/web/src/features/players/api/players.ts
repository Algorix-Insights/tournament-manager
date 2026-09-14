import api from '@/core/api/axios';
import type { Player, PlayerDetail, PlayerInput, PlayersResponse } from '@/features/players/players.types';

export async function fetchPlayers(search = '', page = 1, limit = 20): Promise<PlayersResponse> {
  const params = {
    ...(search ? { search } : {}),
    ...(page !== 1 || limit !== 20 ? { page, limit } : {}),
  };
  const response = Object.keys(params).length > 0
    ? await api.get<PlayersResponse>('/players', { params })
    : await api.get<PlayersResponse>('/players');
  return response.data;
}

export async function createPlayer(data: PlayerInput): Promise<Player> {
  const response = await api.post<Player>('/players', data);
  return response.data;
}

export async function fetchPlayer(id: number): Promise<PlayerDetail> {
  const response = await api.get<PlayerDetail>(`/players/${id}`);
  return response.data;
}

