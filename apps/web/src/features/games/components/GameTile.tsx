import { ArrowUpRight } from "lucide-react";

interface GameTileProps {
  name: string;
  genre: string;
  bgColor: string;
}

export default function GameTile({ name, genre, bgColor }: GameTileProps) {
  return (
    <article className={`flex min-h-32 w-50 flex-col justify-between rounded-[18px] p-4 ${bgColor}`}>
      <div className="mb-12">
        <h2 className="font-manrope-bold text-lg leading-tight tracking-[-0.02em]">{name}</h2>
        <span className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-[12px] leading-none text-[#202124]">
          {genre}
        </span>
      </div>
      <button className="group flex h-7 cursor-pointer items-center justify-between rounded-full bg-white px-3 text-[9px] text-[#111827] transition-transform hover:scale-[1.02]" type="button">
        <span className="flex-1 text-center text-sm">Editar</span>
        <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-black text-white">
          <ArrowUpRight className="size-3" />
        </span>
      </button>
    </article>
  );
}