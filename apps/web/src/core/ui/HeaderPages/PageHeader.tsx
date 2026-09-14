
import MetricItem from '@/core/ui/HeaderPages/MetricItem';

interface PageHeaderProps {
  subtitle: string;
  title: string;
  metrics?: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
  }[];
}

export default function PageHeader({ subtitle, title, metrics = [] }:PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-1 text-sm text-[#8f929b]">{subtitle}</p>
        <h1 className="font-manrope-bold text-2xl tracking-[-0.04em] sm:text-3xl">
          {title}
        </h1>
      </div>

      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {metrics.map((metric) => (
            <MetricItem key={metric.label} {...metric} />
          ))}
        </div>
      )}
    </header>
  );
}