import { StatCard } from "@/features/dashboard/components/StatCard";
import { SectionTitle } from "@/features/dashboard/components/StatSectionTitle";

interface StatsSummaryProps {
  title: string;
  stats: { value: string; label: string }[];
}

export default function StatsSummary({ title, stats }: StatsSummaryProps) {
  return (
    <article className="flex flex-col gap-3" aria-label="Resumen de puntuaciones">
      <SectionTitle>{title}</SectionTitle>

      <div className="grid grid-cols-2 gap-3" aria-label="Resumen de puntuaciones">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </article>
  );
}