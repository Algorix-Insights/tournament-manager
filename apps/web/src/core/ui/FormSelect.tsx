import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: FormSelectOption[];
  required?: boolean;
  'aria-label'?: string;
  onChange: (value: string) => void;
}

export default function FormSelect({
  name,
  value,
  placeholder,
  options,
  required = true,
  'aria-label': ariaLabel,
  onChange,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const selectOption = (option: FormSelectOption) => {
    onChange(option.value);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setSearchTerm("");
          setIsOpen((current) => !current);
        }}
        className={`flex h-11 w-full cursor-pointer items-center justify-between rounded-full border px-4 text-left text-xs font-manrope-regular transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9cffb] ${isOpen ? "border-[#c9b7ff] bg-white" : "border-transparent bg-[#e9edf5]"}`}
      >
        <span className={selectedOption ? "text-[#5f6470]" : "text-[#9ca1aa]"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className={`size-4 text-[#5f6470] transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-60 overflow-y-auto overscroll-contain rounded-2xl border border-[#e5e1f0] bg-white p-1.5 shadow-[0_12px_28px_rgba(17,24,39,0.14)]">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar..."
            aria-label={`Buscar ${ariaLabel?.toLowerCase() ?? name}`}
            autoComplete="off"
            autoFocus
            className="sticky top-0 z-10 mb-1 h-9 w-full rounded-xl border border-[#e5e1f0] bg-white px-3 text-xs font-manrope-regular text-[#5f6470] outline-none placeholder:text-[#9ca1aa] focus:border-[#c9b7ff] focus:ring-2 focus:ring-[#d9cffb]"
          />
          <div role="listbox" aria-label={name}>
          {filteredOptions.length > 0 ? filteredOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${isSelected ? "bg-[#eeeafa] font-manrope-semibold text-[#684bf3]" : "text-[#5f6470] hover:bg-[#f7f3ff] hover:text-[#684bf3]"}`}
              >
                {option.label}
                {isSelected && <Check className="size-3.5" aria-hidden="true" />}
              </button>
            );
          }) : <p className="px-3 py-2.5 text-xs font-manrope-regular text-[#9ca1aa]">No se encontraron opciones.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
