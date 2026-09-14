import floralRockCharacter from "@/assets/floral-rock-character.png";
import FormModal, { type FormModalField } from "../../../core/ui/FormModal";

export interface RegisterPlayerData {
  name: string;
  gamertag: string;
  email: string;
}

const PLAYER_FIELDS: FormModalField[] = [
  { name: "name", label: "Nombre", placeholder: "Nombre" },
  { name: "gamertag", label: "Gamertag", placeholder: "@jugador-tu" },
  { name: "email", label: "Correo Electronico", placeholder: "ejemplo@gmail.com", type: "email" },
];

interface RegisterPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterPlayerData) => void;
}

export default function RegisterPlayerModal({ isOpen, onClose, onSubmit }: RegisterPlayerModalProps) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(values) => onSubmit?.({
        name: values.name ?? "",
        gamertag: values.gamertag ?? "",
        email: values.email ?? "",
      })}
      title="Registrar un nuevo"
      accentTitle="Jugador"
      image={floralRockCharacter}
      fields={PLAYER_FIELDS}
    />
  );
}