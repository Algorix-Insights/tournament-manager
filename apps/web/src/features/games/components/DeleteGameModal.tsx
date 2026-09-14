import AlertDialog from "@/core/ui/AlertDialog/AlertDialog";
import type { Game } from "@/features/games/games.types";

interface DeleteGameModalProps {
  game: Game | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteGameModal({ game, onClose, onConfirm }: Readonly<DeleteGameModalProps>) {
  return (
    <AlertDialog.Root
      isOpen={Boolean(game)}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <AlertDialog.Trigger className="hidden">Abrir confirmación</AlertDialog.Trigger>
      <AlertDialog.Backdrop className="fixed inset-0 z-110 flex items-center justify-center bg-[#101827]/70 px-4 backdrop-blur-sm" isDismissable>
        <AlertDialog.Container>
          <AlertDialog.Dialog aria-label="Confirmar eliminación" className="w-full max-w-105 rounded-3xl bg-[#f2f5fb] p-6 text-[#111827] shadow-2xl">
            <AlertDialog.Header>
              <AlertDialog.Heading className="text-xl font-manrope-bold">Eliminar videojuego</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="mt-3 text-sm text-[#5f6470]">
              ¿Eliminar {game?.name}?
            </AlertDialog.Body>
            <AlertDialog.Footer className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2.5 text-sm text-[#5f6470] transition-colors hover:bg-[#e9edf5]"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="rounded-full bg-[#101827] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#684bf3]"
                onClick={onConfirm}
              >
                Eliminar
              </button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog.Root>
  );
}
