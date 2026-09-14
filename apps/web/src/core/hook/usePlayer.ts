import api from "@/core/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Player {
    id: number;
    name: string;
    gamertag: string;
    email: string;
    createdAt: string;
}

export interface CreatePlayerInput {
    name: string;
    gamertag: string;
    email: string;
}

export interface PlayersResponse {
    data: Player[];
    totalRecords: number;
}

export interface ApiValidationDetail {
    field: string;
    message: string;
}

export interface ApiErrorResponse {
    error?: string;
    details?: ApiValidationDetail[];
}

export const playersQueryKey = ["players"] as const;

export function useGetPlayers() {
    return useQuery<PlayersResponse>({
        queryKey: playersQueryKey,
        queryFn: async () => {
            const response = await api.get<PlayersResponse>("/players");
            return response.data;
        },
    });
}

export function useRegisterPlayer() {
    const queryClient = useQueryClient();

    return useMutation<Player, unknown, CreatePlayerInput>({
        mutationFn: async (player) => {
            const response = await api.post<Player>("/players", player);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: playersQueryKey });
            await queryClient.invalidateQueries({ queryKey: ["stats"] });
        },
    });
}