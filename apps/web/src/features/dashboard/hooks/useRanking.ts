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
    totalRecords: number;
}

export const rankingKeys = {
    all: ["ranking"] as const,
    list: (gameId?: number, page = 1, limit = 20) => ["ranking", { gameId, page, limit }] as const,
};

export function useRanking(gameId?: number, page = 1, limit = 20) {
    return useQuery<RankingResponse>({
        queryKey: rankingKeys.list(gameId, page, limit),
        queryFn: async (): Promise<RankingResponse> => {
            const params = {
                ...(gameId !== undefined ? { gameId } : {}),
                ...(page !== 1 || limit !== 20 ? { page, limit } : {}),
            };
            const response = Object.keys(params).length > 0
                ? await api.get<RankingResponse>("/scores/ranking", { params })
                : await api.get<RankingResponse>("/scores/ranking");
            return response.data;
        },
    });
}