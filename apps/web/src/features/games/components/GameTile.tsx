import { ArrowUpRight, Trash2 } from "lucide-react";

interface GameTileProps {
  name: string;
  genre: string;
  bgColor: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export default function GameTile({ name, genre, bgColor, onEdit, onDelete, isDeleting = false }: GameTileProps) {
  return (
    <article className={`flex min-h-32 w-50 flex-col justify-between rounded-[18px] p-4 ${bgColor}`}>
      <div className="mb-12">
        <h2 className="font-manrope-bold text-lg leading-tight tracking-[-0.02em]">{name}</h2>
        <span className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-[12px] leading-none text-[#202124]">
          {genre}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="group flex h-7 min-w-0 flex-1 cursor-pointer items-center justify-between rounded-full bg-white px-3 text-[9px] text-[#111827] transition-transform hover:scale-[1.02]" type="button" onClick={onEdit}>
          <span className="flex-1 text-center text-sm">Editar</span>
          <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-black text-white">
            <ArrowUpRight className="size-3" />
          </span>
        </button>
        {onDelete && (
          <button
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-red-600 transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label={`Eliminar ${name}`}
          >
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
    </article>
  );
}
