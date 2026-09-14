import api from "@/core/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface RankingEntry {
    position: number;
    playerId: number;
    player: string;
    playerName: string;
    gameId: number;
    game: string;
    genre: string;
    score: number;
    createdAt: string;
}

export interface RankingResponse {
    data: RankingEntry[];
}

export function useRanking() {
    return useQuery<RankingResponse>({
        queryKey: ["ranking"],
        queryFn: async (): Promise<RankingResponse> => {
            const response = await api.get<RankingResponse>("/scores/ranking");
            return response.data;
        },
    });
}