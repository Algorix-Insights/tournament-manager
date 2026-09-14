import { UsersRound, Gamepad2 } from "lucide-react";
import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import ScoresHeader from "@/features/scores/components/ScoresHeader";
import ScoresTable from "@/features/scores/components/ScoresTable";
import type { ScoreRowData } from "@/features/scores/components/ScoreRow";
import { useRanking } from "@/features/dashboard/hooks/useRanking";
import { useStats } from "@/features/dashboard/hooks/useStats";

export default function ScoresPage() {
  const { data: ranking, isLoading, isError } = useRanking();
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const scores: ScoreRowData[] =
    ranking?.data.map((entry) => ({
      position: entry.position,
      name: entry.playerName,
      handle: entry.player,
      game: entry.game,
      score: entry.score,
    })) ?? [];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Clasificación</h2>
      <div className="mx-auto flex max-w-290 flex-col gap-6">
        {/*Bienvenida a administrar*/}
        <PageHeader
          subtitle="Listo para la aventura"
          metrics={[
            {
              icon: <UsersRound className="size-5" />,
              value: stats?.totalPlayers ?? "",
              label: "Jugadores Registrados",
              isLoading: isStatsLoading,
            },
            {
              icon: <Gamepad2 className="size-5" />,
              value: stats?.totalGames ?? "",
              label: "Videojuegos Registrados",
              isLoading: isStatsLoading,
            },
          ]}
        />

        <section className="flex flex-col gap-3" aria-labelledby="scores-title">
          <ScoresHeader title="Clasificación de GameSpace" filterLabel="Clasificación General" />
          <ScoresTable players={scores} isLoading={isLoading} isError={isError} />
        </section>
      </div>
    </main>
  );
}

