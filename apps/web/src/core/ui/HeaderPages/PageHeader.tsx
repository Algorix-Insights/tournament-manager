import MetricItem from './MetricItem';

interface PageHeaderProps {
  subtitle: string;
  title?: string;
  metrics?: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    isLoading?: boolean;
  }[];
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días, Admin';
  if (hour < 19) return 'Buenas tardes, Admin';
  return 'Buenas noches, Admin';
};

export default function PageHeader({ subtitle, metrics = [] }: Readonly<PageHeaderProps>) {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-1 text-sm text-[#8f929b]"> {subtitle}</p>
        <h1 className="font-manrope-bold text-2xl tracking-[-0.04em] sm:text-4xl">
          {getGreeting().slice(0, getGreeting().lastIndexOf(" "))}{" "}
          <span className="text-[#6d28d9]">{getGreeting().split(" ").pop()}</span>
        </h1>
      </div>

      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-12">
          {metrics.map((metric) => (
            <MetricItem key={metric.label} {...metric} />
          ))}
        </div>
      )}
    </header>
  );
}
