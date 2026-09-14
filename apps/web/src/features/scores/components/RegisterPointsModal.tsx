import floralCoin from "@/assets/floral-coin.png";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";
import { useGetGames } from "@/core/hook/useGame";
import FormModal, { type FormModalField } from "@/core/ui/FormModal";
import { useGetPlayers } from "@/core/hook/usePlayer";
import { useAssignScore } from "@/core/hook/useScore";
import type { ApiErrorResponse } from "@/core/hook/usePlayer";

export interface RegisterPointsData {
  playerId: string;
  gameId: string;
  score: number;
}

interface RegisterPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterPointsData) => void;
}

export default function RegisterPointsModal({ isOpen, onClose, onSubmit }: RegisterPointsModalProps) {
  const { data: playersResponse, isLoading: arePlayersLoading } = useGetPlayers();
  const { data: gamesResponse, isLoading: areGamesLoading } = useGetGames();
  const assignScore = useAssignScore();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const pointFields = useMemo<FormModalField[]>(() => [
    {
      name: "playerId",
      label: "Nombre del jugador",
      placeholder: arePlayersLoading ? "Cargando jugadores..." : "Selecciona un jugador",
      control: "select",
      options: (playersResponse?.data ?? []).map((player) => ({ label: player.name, value: String(player.id) })),
    },
    {
      name: "gameId",
      label: "Videojuego",
      placeholder: areGamesLoading ? "Cargando videojuegos..." : "Selecciona un videojuego",
      control: "select",
      options: (gamesResponse?.data ?? []).map((game) => ({ label: game.name, value: String(game.id) })),
    },
    { name: "score", label: "Puntuación", placeholder: "189", type: "number" },
  ], [areGamesLoading, arePlayersLoading, gamesResponse?.data, playersResponse?.data]);

  const handleSubmit = async (values: Record<string, string>) => {
    setFieldErrors({});
    setFormError("");

    try {
      const score = await assignScore.mutateAsync({
        playerId: Number(values.playerId),
        gameId: Number(values.gameId),
        score: Number(values.score),
      });
      onSubmit?.({ playerId: values.playerId, gameId: values.gameId, score: score.score });
      onClose();
    } catch (error) {
      const response = isAxiosError<ApiErrorResponse>(error) ? error.response?.data : undefined;
      setFieldErrors(Object.fromEntries((response?.details ?? []).map((detail) => [detail.field, detail.message])));
      setFormError(response?.error ?? "No se pudieron asignar los puntos.");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Asignar puntos a"
      accentTitle="un Jugador"
      image={floralCoin}
      fields={pointFields}
      submitLabel="Asignar"
      errors={fieldErrors}
      formError={formError}
      isSubmitting={assignScore.isPending}
    />
  );
}