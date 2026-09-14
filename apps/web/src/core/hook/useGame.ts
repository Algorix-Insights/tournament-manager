import api from "@/core/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface GameGenre {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    name: string;
    genreId: number;
    genre: GameGenre;
}

export interface GamesResponse {
    data: Game[];
    totalRecords: number;
}

export const gamesQueryKey = ["games"] as const;

export function useGetGames() {
    return useQuery<GamesResponse>({
        queryKey: gamesQueryKey,
        queryFn: async () => {
            const response = await api.get<GamesResponse>("/games");
            return response.data;
        },
    });
}