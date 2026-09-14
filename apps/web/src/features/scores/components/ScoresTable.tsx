import ScoreRow, { type ScoreRowData } from "@/features/scores/components/ScoreRow";
import Skeleton from "@/core/ui/Skeleton";

interface ScoresTableProps {
  players?: ScoreRowData[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function ScoresTable({ players = [], isLoading = false, isError = false }: ScoresTableProps) {
  return (
    <div className="flex flex-col gap-2" aria-label="Clasificación de jugadores">
      <div className="hidden grid-cols-[70px_1fr_140px_70px] px-4 text-[11px] text-[#8f929b] sm:grid">
        <span>Posición</span>
        <span>Jugador</span>
        <span>Juego</span>
        <span className="text-right">Puntuación</span>
      </div>

      {isLoading ? (
        Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-full bg-white px-3 py-2.5 sm:grid-cols-[70px_1fr_140px_70px] sm:px-4"
          >
            <Skeleton className="h-4 w-5 rounded" />
            <div className="flex min-w-0 items-center gap-3 sm:col-start-2">
              <Skeleton className="size-9 shrink-0 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-28 rounded" />
                <Skeleton className="h-2 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        ))
      ) : isError ? (
        <div className="rounded-2xl bg-white p-6 text-center text-xs text-red-500">
          Ocurrió un error al cargar la clasificación. Por favor, intenta de nuevo.
        </div>
      ) : players.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-xs text-[#8f929b]">
          No hay puntuaciones registradas en la clasificación.
        </div>
      ) : (
        players.map((player) => (
          <ScoreRow key={`${player.position}-${player.name}-${player.game}`} player={player} />
        ))
      )}
    </div>
  );
}