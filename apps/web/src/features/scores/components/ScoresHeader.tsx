import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface ScoresHeaderProps {
  title: string;
  filterLabel: string;
  filter?: ReactNode;
}

export default function ScoresHeader({ title, filterLabel, filter }: ScoresHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[22px] bg-[#eeeafa] px-5 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-[#8B61F9]" aria-hidden="true" />
        <h2 id="scores-title" className="font-manrope-bold text-sm tracking-[-0.03em] sm:text-base">{title}</h2>
      </div>
      {filter ?? (
        <button type="button" className="flex shrink-0 items-center gap-8 rounded-[14px] bg-white px-4 py-2.5 text-[10px] text-[#5f6470]">
          {filterLabel}
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}