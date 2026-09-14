import floralCoin from "@/assets/floral-coin.png";
import FormModal, { type FormModalField } from "@/core/ui/FormModal";

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

const POINTS_FIELDS: FormModalField[] = [
  {
    name: "playerId",
    label: "Nombre del jugador",
    placeholder: "Nombre",
    control: "select",
    options: [
      { label: "Boki Rodriguez", value: "1" },
      { label: "Sebastián VP", value: "2" },
      { label: "Churi Delez", value: "3" },
    ],
  },
  {
    name: "gameId",
    label: "Videojuego",
    placeholder: "Mario bro",
    control: "select",
    options: [
      { label: "Mario bro", value: "1" },
      { label: "Minecraft", value: "2" },
      { label: "Brawl Stars", value: "3" },
    ],
  },
  { name: "score", label: "Puntuación", placeholder: "189", type: "number" },
];

export default function RegisterPointsModal({ isOpen, onClose, onSubmit }: RegisterPointsModalProps) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(values) => onSubmit?.({ playerId: values.playerId ?? "", gameId: values.gameId ?? "", score: Number(values.score) })}
      title="Asignar puntos a"
      accentTitle="un Jugador"
      image={floralCoin}
      fields={POINTS_FIELDS}
      submitLabel="Asignar"
    />
  );
}