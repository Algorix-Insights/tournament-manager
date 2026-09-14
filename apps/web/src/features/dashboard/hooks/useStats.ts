import api from "@/core/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface StatsResponse {
    totalPlayers: number;
    totalGames: number;
    totalScores: number;
    averageScore: number;
}

export function useStats() {
    return useQuery<StatsResponse>({
        queryKey: ["stats"],
        queryFn: async (): Promise<StatsResponse> => {
            const response = await api.get<StatsResponse>("/scores/stats");
            return response.data;
        },
    });
}