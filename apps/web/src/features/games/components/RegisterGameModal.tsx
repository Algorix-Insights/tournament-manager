import floralGameController from "@/assets/floral-game-icon-controller-form.png";
import FormModal, { type FormModalField } from "@/core/ui/FormModal";
import type { Game, GameGenre } from "@/features/games/games.types";
import { useMemo } from "react";

export interface RegisterGameData {
  name: string;
  genreId: number;
}

interface RegisterGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterGameData) => void;
  genres?: GameGenre[];
  initialGame?: Game | null;
  errorMessage?: string | null;
  isSubmitting?: boolean;
}

export default function RegisterGameModal({
  isOpen,
  onClose,
  onSubmit,
  genres = [],
  initialGame,
  errorMessage,
  isSubmitting = false,
}: Readonly<RegisterGameModalProps>) {
  const fields = useMemo<FormModalField[]>(() => [
    { name: "name", label: "Nombre del videojuego", placeholder: "Nombre" },
    {
      name: "genreId",
      label: "Género del videojuego",
      placeholder: "Selecciona un género",
      control: "select",
      options: genres.map((genre) => ({ label: genre.name, value: String(genre.id) })),
    },
  ], [genres]);
  const initialValues = useMemo(
    () => initialGame ? { name: initialGame.name, genreId: String(initialGame.genreId) } : undefined,
    [initialGame],
  );

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(values) => onSubmit?.({ name: values.name ?? "", genreId: Number(values.genreId) })}
      title={initialGame ? "Editar" : "Registrar un nuevo"}
      accentTitle="Videojuego"
      image={floralGameController}
      fields={fields}
      initialValues={initialValues}
      errorMessage={errorMessage}
      isSubmitting={isSubmitting}
      submitLabel={initialGame ? "Guardar" : "Registrar"}
    />
  );
}
