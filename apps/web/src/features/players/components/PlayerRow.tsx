import { useState } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import GameCard from "@/features/players/components/GameCard";
import type { PlayerGame } from "@/features/players/players.types";

interface GameDetail {
  name: string;
  genre: string;
  rank: number;
  points: number;
}

export interface PlayerRowData {
  position: number;
  name: string;
  handle: string;
  email: string;
  registeredAt: string;
  games: PlayerGame[];
  initiallyOpen?: boolean;
}

type PlayerRowProps = PlayerRowData;

const CARD_COLORS = ["bg-[#FDF1FA]", "bg-[#E5DFF5]"];

export default function PlayerRow({
  position,
  name,
  handle,
  email,
  registeredAt,
  games: playedGames,
  initiallyOpen = false,
}: PlayerRowProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const games: GameDetail[] = playedGames.map((game, index) => ({
    name: game.game,
    genre: game.genre,
    rank: index + 1,
    points: game.score,
  }));
  const mainGame = games[0]?.name ?? "Sin juegos";
  const extraGamesCount = Math.max(games.length - 1, 0);

  return (
    <div
      className={`overflow-hidden rounded-[22px] bg-white transition-all ${
        isOpen ? "p-4" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid w-full grid-cols-[88px_minmax(180px,1fr)_minmax(180px,1fr)_minmax(160px,1fr)_auto] items-center gap-3 rounded-full px-4 py-3 text-left text-xs"
      >
        <span>{position}</span>

        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9cffb] text-xs">
            {name.charAt(0)}
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-[13px]">{name}</strong>
            <small className="block text-[10px] text-[#8f929b]">
              {handle}
            </small>
          </span>
        </div>

        <span className="truncate text-[13px] text-[#111827]">{email}</span>

        <span className="text-[13px] text-[#111827]">{registeredAt}</span>

        <div className="flex items-center gap-3 justify-self-end">
          <span className="flex items-center gap-1 rounded-full bg-[#f4f1f8] px-3 py-1 text-[11px] text-[#8f929b]">
            {mainGame}
          </span>
          {extraGamesCount > 0 && (
            <span className="text-[11px] text-[#8f929b]">
              +{extraGamesCount}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="size-4 text-[#111827]" aria-hidden="true" />
          ) : (
            <ChevronRight
              className="size-4 text-[#8f929b]"
              aria-hidden="true"
            />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-1 pb-2 pt-1 sm:px-2">
          <p className="mb-4 text-xs text-[#8f929b]">
            Ha participado en los siguientes juegos y ha obtenido puntos
          </p>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] gap-1 sm:grid-cols-[repeat(3,180px)]">
              {games.map((game, index) => (
                <GameCard
                  key={game.name}
                  name={game.name}
                  genre={game.genre}
                  rank={game.rank}
                  points={game.points}
                  bgColor={CARD_COLORS[index % CARD_COLORS.length]}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8f929b]">No hay juegos registrados.</p>
          )}
        </div>
      )}
    </div>
  );
}
