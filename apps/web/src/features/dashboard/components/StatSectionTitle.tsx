interface SectionTitleProps {
    children: React.ReactNode;
    barColor?: string;
}

export function SectionTitle({ children, barColor = "bg-[#8B61F9]" }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-10 w-3 rounded-full shrink-0 ${barColor}`} aria-hidden="true" />
      <p className="font-manrope-bold text-lg leading-tight">{children}</p>
    </div>
  );
}