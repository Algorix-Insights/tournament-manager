import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;

}

export default function SearchInput({
  placeholder = "Buscar",
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="flex w-1/2 h-12 items-center gap-3 rounded-full bg-white px-5">
      <Search className="size-5 text-[#8f929b]" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#8f929b] focus:outline-none"
      />
    </div>
  );
}