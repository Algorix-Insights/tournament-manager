import floralRockCharacter from "@/assets/floral-rock-character.png";
import { useState } from "react";
import { isAxiosError } from "axios";
import FormModal, { type FormModalField } from "@/core/ui/FormModal";
import { useRegisterPlayer, type ApiErrorResponse } from "@/core/hook/usePlayer";

export interface RegisterPlayerData {
  name: string;
  gamertag: string;
  email: string;
}

const PLAYER_FIELDS: FormModalField[] = [
  { name: "name", label: "Nombre", placeholder: "Nombre" },
  { name: "gamertag", label: "Gamertag", placeholder: "jugador-tu" },
  { name: "email", label: "Correo Electronico", placeholder: "ejemplo@gmail.com", type: "email" },
];

interface RegisterPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterPlayerData) => void;
}

export default function RegisterPlayerModal({ isOpen, onClose, onSubmit }: RegisterPlayerModalProps) {
  const registerPlayer = useRegisterPlayer();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values: Record<string, string>) => {
    setFieldErrors({});
    setFormError("");

    try {
      const player = await registerPlayer.mutateAsync({
        name: values.name ?? "",
        gamertag: values.gamertag ?? "",
        email: values.email ?? "",
      });
      onSubmit?.(player);
      onClose();
    } catch (error) {
      const response = isAxiosError<ApiErrorResponse>(error) ? error.response?.data : undefined;
      const details = response?.details ?? [];
      setFieldErrors(Object.fromEntries(details.map((detail) => [detail.field, detail.message])));
      setFormError(response?.error ?? "No se pudo registrar el jugador.");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Registrar un nuevo"
      accentTitle="Jugador"
      image={floralRockCharacter}
      fields={PLAYER_FIELDS}
      errors={fieldErrors}
      formError={formError}
      isSubmitting={registerPlayer.isPending}
    />
  );
}