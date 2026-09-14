import ScoreRow, { type ScoreRowData } from "@/features/scores/components/ScoreRow";

interface ScoresTableProps {
  players: ScoreRowData[];
}

export default function ScoresTable({ players }: ScoresTableProps) {
  return (
    <div className="flex flex-col gap-2" aria-label="Clasificación de jugadores">
      <div className="hidden grid-cols-[70px_1fr_140px_70px] px-4 text-[11px] text-[#8f929b] sm:grid">
        <span>Posición</span>
        <span>Jugador</span>
        <span>Juego</span>
        <span className="text-right">Puntuación</span>
      </div>
      {players.map((player) => <ScoreRow key={`${player.position}-${player.name}`} player={player} />)}
    </div>
  );
}