import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
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

export type FormModalErrors = Record<string, string>;

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
  errors?: FormModalErrors;
  formError?: string;
  isSubmitting?: boolean;
  title: string;
  accentTitle: string;
  image: string;
  fields: FormModalField[];
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
  submitLabel = "Registrar",
  errors = {},
  formError,
  isSubmitting = false,
}: FormModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<FormModalErrors>({});

  useEffect(() => {
    if (!isOpen) return;

    setValues(Object.fromEntries(fields.map((field) => [field.name, ""])));
    setValidationErrors({});
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [fields, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextValidationErrors: FormModalErrors = {};
    fields.forEach((field) => {
      const value = values[field.name]?.trim() ?? "";
      if ((field.required ?? true) && !value) {
        nextValidationErrors[field.name] = `${field.label} es obligatorio.`;
      } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextValidationErrors[field.name] = "Ingresa un correo electrónico válido.";
      } else if (field.type === "number" && value && !/^[1-9]\d*$/.test(value)) {
        nextValidationErrors[field.name] = `${field.label} debe ser mayor que cero.`;
      }
    });

    setValidationErrors(nextValidationErrors);
    if (Object.keys(nextValidationErrors).length > 0) return;
    await onSubmit?.(values);
  };

  return createPortal((
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#101827]/95 px-4 py-6"
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
        className="max-h-[calc(100vh-3rem)] w-full max-w-120 overflow-y-auto rounded-4xl bg-[#f2f5fb] px-6 pb-7 pt-5 text-[#111827] shadow-2xl sm:px-8"
        onSubmit={handleSubmit}
      >
        <img className="mx-auto -mt-1 mb-2 h-36 w-56 object-contain sm:h-40" src={image} alt="" />
        <h2 className="text-center font-manrope-bold text-2xl leading-tight tracking-[-0.04em] sm:text-3xl">
          {title}
          <span className="block text-[#684bf3]">{accentTitle}</span>
        </h2>

        {formError && <div className="mt-3 text-center text-xs font-manrope-regular text-[#dc2626]" role="alert">{formError}</div>}

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
                    onChange={(value) => {
                      setValues((current) => ({ ...current, [field.name]: value }));
                      setValidationErrors((current) => ({ ...current, [field.name]: "" }));
                    }}
                  />
              ) : (
                <input
                  type={field.type ?? "text"}
                  min={field.type === "number" ? "1" : undefined}
                  step={field.type === "number" ? "1" : undefined}
                  value={values[field.name] ?? ""}
                  onChange={(event) => {
                    setValues((current) => ({
                      ...current,
                      [field.name]: field.type === "number" ? event.target.value.replace(/\D/g, "") : event.target.value,
                    }));
                    setValidationErrors((current) => ({ ...current, [field.name]: "" }));
                  }}
                  placeholder={field.placeholder}
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  aria-invalid={Boolean(errors[field.name] || validationErrors[field.name])}
                  className="h-11 rounded-full bg-white px-4 text-xs font-manrope-regular outline-none ring-[#684bf3] placeholder:text-[#9ca1aa] focus:ring-2"
                />
              )}
              {(errors[field.name] || validationErrors[field.name]) && <span className="text-xs font-manrope-regular text-[#dc2626]" role="alert">{errors[field.name] || validationErrors[field.name]}</span>}
            </label>
          ))}
        </div>

        <button
          className="mt-6 flex h-11 w-full cursor-pointer items-center justify-between rounded-full bg-[#101827] pl-4 pr-1 text-xs text-white transition-transform hover:scale-[1.01]"
          type="submit"
          disabled={isSubmitting}
        >
          <span className="flex-1 text-center">{isSubmitting ? "Registrando..." : submitLabel}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-[#f4f1f8] text-base text-[#101827]" aria-hidden="true">↗</span>
        </button>
      </form>
    </div>
  ), document.body);
}
