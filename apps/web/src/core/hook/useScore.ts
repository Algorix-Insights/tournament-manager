import api from "@/core/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiErrorResponse } from "@/core/hook/usePlayer";

export interface CreateScoreInput {
    gameId: number;
    playerId: number;
    score: number;
}

export interface Score {
    id: number;
    gameId: number;
    playerId: number;
    score: number;
    createdAt: string;
}

export function useAssignScore() {
    const queryClient = useQueryClient();

    return useMutation<Score, ApiErrorResponse, CreateScoreInput>({
        mutationFn: async (score) => {
            const response = await api.post<Score>("/scores", score);
            return response.data;
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["stats"] }),
                queryClient.invalidateQueries({ queryKey: ["ranking"] }),
            ]);
        },
    });
}