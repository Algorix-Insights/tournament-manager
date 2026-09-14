import { useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@/core/query/queryKeys";
import { fetchPlayers } from "@/features/players/api/players";

const playersKeys = createQueryKeys("players");

export function usePlayerSearch(search: string) {
  const normalizedSearch = search.trim();

  return useQuery({
    queryKey: playersKeys.list({ search: normalizedSearch, page: 1, limit: 8 }),
    queryFn: () => fetchPlayers(normalizedSearch, 1, 8),
    enabled: normalizedSearch.length >= 2,
  });
}
