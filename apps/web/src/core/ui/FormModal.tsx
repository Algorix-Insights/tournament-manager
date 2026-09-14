import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import FormSelect from "@/core/ui/FormSelect";

export interface FormModalField {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "number";
  control?: "input" | "select";
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: Record<string, string>) => void;
  title: string;
  accentTitle: string;
  image: string;
  fields: FormModalField[];
  initialValues?: Record<string, string>;
  errorMessage?: string | null;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  accentTitle,
  image,
  fields,
  initialValues,
  errorMessage,
  isSubmitting = false,
  submitLabel = "Registrar",
}: FormModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;

    setValues(Object.fromEntries(fields.map((field) => [field.name, initialValues?.[field.name] ?? ""])));
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [fields, initialValues, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasInvalidNumber = fields.some((field) => {
      if (field.type !== "number") return false;
      const value = values[field.name] ?? "";
      return !/^[1-9]\d*$/.test(value);
    });

    if (hasInvalidNumber) return;
    onSubmit?.(values);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#101827]/95 px-4 py-6"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <button
        className="absolute right-5 top-4 cursor-pointer p-1 text-white/80 transition-colors hover:text-white"
        type="button"
        onClick={onClose}
        aria-label="Cerrar formulario"
      >
        <X className="size-7" strokeWidth={1.8} />
      </button>

      <form
        className="w-full max-w-120 rounded-4xl bg-[#f2f5fb] px-6 pb-7 pt-5 text-[#111827] shadow-2xl sm:px-8"
        onSubmit={handleSubmit}
      >
        <img className="mx-auto -mt-1 mb-2 h-36 w-56 object-contain sm:h-40" src={image} alt="" />
        <h2 className="text-center font-manrope-bold text-2xl leading-tight tracking-[-0.04em] sm:text-3xl">
          {title}
          <span className="block text-[#684bf3]">{accentTitle}</span>
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          {fields.map((field) => (
            <label key={field.name} className="flex flex-col gap-1.5 text-xs font-manrope-bold">
              {field.label}
              {field.control === "select" ? (
                  <FormSelect
                    name={field.name}
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder}
                    options={field.options ?? []}
                    required={field.required ?? true}
                    aria-label={field.label}
                    onChange={(value) => setValues((current) => ({ ...current, [field.name]: value }))}
                  />
              ) : (
                <input
                  required={field.required ?? true}
                  type={field.type ?? "text"}
                  min={field.type === "number" ? "1" : undefined}
                  step={field.type === "number" ? "1" : undefined}
                  value={values[field.name] ?? ""}
                  onChange={(event) => setValues((current) => ({
                    ...current,
                    [field.name]: field.type === "number" ? event.target.value.replace(/\D/g, "") : event.target.value,
                  }))}
                  placeholder={field.placeholder}
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  className="h-11 rounded-full bg-white px-4 text-xs font-manrope-regular outline-none ring-[#684bf3] placeholder:text-[#9ca1aa] focus:ring-2"
                />
              )}
            </label>
          ))}
        </div>

        {errorMessage && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-xs text-red-700">
            {errorMessage}
          </p>
        )}

        <button
          className="mt-6 flex h-11 w-full cursor-pointer items-center justify-between rounded-full bg-[#101827] pl-4 pr-1 text-xs text-white transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          <span className="flex-1 text-center">{isSubmitting ? "Guardando..." : submitLabel}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-[#f4f1f8] text-base text-[#101827]" aria-hidden="true">↗</span>
        </button>
      </form>
    </div>
  );
}
