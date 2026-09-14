import api from "@/core/api/axios";
import type { PlayersResponse } from "@/features/players/players.types";

export async function fetchPlayers(search = "", limit = 8): Promise<PlayersResponse> {
  const response = await api.get<PlayersResponse>("/players", {
    params: { search, limit, page: 1 },
  });

  return response.data;
}