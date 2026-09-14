import floralCoin from "@/assets/floral-coin.png";
import FormModal, { type FormModalField } from "@/core/ui/FormModal";
import type { Game } from "@/features/games/games.types";
import type { Player } from "@/features/players/players.types";

export interface RegisterPointsData {
  playerId: string;
  gameId: string;
  score: number;
}

interface RegisterPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterPointsData) => void;
  players?: Player[];
  games?: Game[];
  errorMessage?: string | null;
  isSubmitting?: boolean;
}

export default function RegisterPointsModal({
  isOpen,
  onClose,
  onSubmit,
  players = [],
  games = [],
  errorMessage,
  isSubmitting = false,
}: RegisterPointsModalProps) {
  const fields: FormModalField[] = [
    {
      name: "playerId",
      label: "Nombre del jugador",
      placeholder: "Nombre",
      control: "select",
      options: players.map((player) => ({ label: player.name, value: String(player.id) })),
    },
    {
      name: "gameId",
      label: "Videojuego",
      placeholder: "Selecciona un videojuego",
      control: "select",
      options: games.map((game) => ({ label: game.name, value: String(game.id) })),
    },
    { name: "score", label: "Puntuación", placeholder: "189", type: "number" },
  ];

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(values) => onSubmit?.({ playerId: values.playerId ?? "", gameId: values.gameId ?? "", score: Number(values.score) })}
      title="Asignar puntos a"
      accentTitle="un Jugador"
      image={floralCoin}
      fields={fields}
      submitLabel="Asignar"
      errorMessage={errorMessage}
      isSubmitting={isSubmitting}
    />
  );
}
