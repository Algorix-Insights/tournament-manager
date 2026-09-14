interface GameCardProps {
  name: string;
  genre: string;
  rank: number;
  points: number;
  bgColor: string;
}

export default function GameCard({
  name,
  genre,
  rank,
  points,
  bgColor,
}: GameCardProps) {
  return (
    <div
      className={`grid w-40 min-h-31 row-span-3 grid-rows-subgrid gap-y-3 rounded-[18px] p-4 ${bgColor}`}
    >
      <div className="mb-3 flex flex-col gap-2">
        <h4 className="font-manrope-bold text-lg leading-tight tracking-[-0.02em]">
        {name}
      </h4>

      <span className="w-fit self-start rounded-full bg-white/80 px-3 py-1 text-[12px] leading-none text-[#202124]">
        {genre}
      </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] items-end gap-3">
        <span className="flex items-center gap-3 text-xs text-[#8f929b]">
          N° {rank}
          <span className="h-4 w-px bg-[#d9d7e0]" aria-hidden="true" />
        </span>
        <strong className="text-right text-sm tracking-[-0.02em]">
          {points} pts
        </strong>
      </div>
    </div>
  );
}