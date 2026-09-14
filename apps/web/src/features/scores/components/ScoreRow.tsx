import { Medal } from "lucide-react";

export interface ScoreRowData {
  position: number;
  name: string;
  handle: string;
  game: string;
  score: number;
  games: { gameId: number; game: string; genre: string; score: number }[];
}

interface ScoreRowProps {
  player: ScoreRowData;
}

const positionStyles = [
  "bg-[#fff1a9] text-[#d49b00]",
  "bg-[#f0f1f4] text-[#7d8490]",
  "bg-[#f6dfd2] text-[#c36d45]",
];

export default function ScoreRow({ player }: ScoreRowProps) {
  const positionStyle = positionStyles[player.position - 1] ?? "text-[#111827]";

  return (
    <div className="rounded-[22px] bg-white px-3 py-2.5 sm:px-4">
      <div className="grid grid-cols-[44px_1fr_auto] items-center gap-3 sm:grid-cols-[70px_1fr_140px_70px]">
        <span className={`flex size-7 items-center justify-center rounded-full text-xs ${positionStyle}`}>
          {player.position === 1 ? <Medal className="size-4" aria-label="Primer lugar" /> : player.position}
        </span>
        <div className="flex min-w-0 items-center gap-3 sm:col-start-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9cffb] text-xs">{player.name.charAt(0)}</span>
          <span className="min-w-0">
            <strong className="block truncate text-xs font-manrope-medium">{player.name}</strong>
            <small className="block text-[10px] text-[#8f929b]">{player.handle}</small>
          </span>
        </div>
        <span className="hidden rounded-full border border-[#e8e7eb] px-2 py-1 text-[10px] text-[#18191d] sm:block text-center">{player.game}</span>
        <strong className="text-right text-sm font-manrope-regular text-[#684bf3]">{player.score}</strong>
      </div>
      {player.games.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-2 border-t border-[#f0eef3] pt-2 text-[10px] text-[#8f929b]" aria-label={`Juegos de ${player.name}`}>
          {player.games.slice(1).map((game) => (
            <span key={game.gameId} className="rounded-full bg-[#f7f6f8] px-2 py-1">
              {game.game}: {game.score}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
