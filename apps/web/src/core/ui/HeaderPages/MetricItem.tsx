interface MetricItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export default function MetricItem({ icon, value, label }: MetricItemProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eee9fc] text-[#6d28d9]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <strong className="block font-manrope-bold text-2xl leading-none sm:text-2xl">
          {value}
        </strong>
        <span className="text-[10px] text-[#8f929b] sm:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
}