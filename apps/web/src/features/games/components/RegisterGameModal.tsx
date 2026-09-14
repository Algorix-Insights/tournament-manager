import floralGameController from "@/assets/floral-game-icon-controller-form.png";
import FormModal, { type FormModalField } from "../../../core/ui/FormModal";

export interface RegisterGameData {
  name: string;
  category: string;
}

interface RegisterGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterGameData) => void;
}

const GAME_FIELDS: FormModalField[] = [
  { name: "name", label: "Nombre del videojuego", placeholder: "Nombre" },
  { name: "category", label: "Categoría del videojuego", placeholder: "Categoría" },
];

export default function RegisterGameModal({ isOpen, onClose, onSubmit }: RegisterGameModalProps) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(values) => onSubmit?.({ name: values.name ?? "", category: values.category ?? "" })}
      title="Registrar un nuevo"
      accentTitle="Videojuego"
      image={floralGameController}
      fields={GAME_FIELDS}
    />
  );
}
