
import PlayerRow from "@/features/players/components/PlayerRow";

interface PlayersTableProps {
  players: Array<React.ComponentProps<typeof PlayerRow>>;
}

export default function PlayersTable({ players }: PlayersTableProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="hidden grid-cols-[88px_minmax(180px,1fr)_minmax(180px,1fr)_minmax(160px,1fr)_auto] gap-3 px-4 text-[12px] text-[#8f929b] sm:grid">
        <span>Posición</span>
        <span>Jugador</span>
        <span>Correo Electrónico</span>
        <span>Fecha de registro</span>
        <span className="justify-self-end pr-6">Ha jugado</span>
      </div>

      <div className="flex flex-col gap-3">
        {players.map((player) => (
          <PlayerRow key={player.position} {...player} />
        ))}
      </div>
    </div>
  );
}