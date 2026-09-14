interface StatCardProps{
    value: string;
    label: string;
    bgColor?: string;
}

export function StatCard({ value, label, bgColor = "bg-[#eeeafa]" }: StatCardProps) {
  return (
    <div
      className={`flex min-h-42.5 flex-col justify-between rounded-[18px] p-5 ${bgColor}`}
    >
      <strong className="text-2xl tracking-[-0.04em]">{value}</strong>
      <p className="max-w-60 text-[16px] leading-tight text-[#8f929b]">
        {label}
      </p>
    </div>
  );
}