import Skeleton from "../Skeleton";

interface MetricItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  isLoading?: boolean;
}

export default function MetricItem({ icon, value, label, isLoading = false }: MetricItemProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        className="flex size-15 shrink-0 items-center justify-center rounded-full bg-[#eee9fc] text-[#6d28d9]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <strong className="block font-manrope-bold text-4xl leading-none" aria-hidden={isLoading}>
          {isLoading ? <Skeleton className="h-9 w-16 rounded-lg" /> : value}
        </strong>
        <span className="text-[10px] text-[#8f929b] sm:text-[13px]">
          {label}
        </span>
      </div>
    </div>
  );
}