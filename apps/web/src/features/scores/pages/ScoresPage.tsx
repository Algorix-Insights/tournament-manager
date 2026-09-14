import { UsersRound, Gamepad2 } from "lucide-react";
import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import ScoresHeader from "@/features/scores/components/ScoresHeader";
import ScoresTable from "@/features/scores/components/ScoresTable";
import type { ScoreRowData } from "@/features/scores/components/ScoreRow";
import { useRanking } from "@/features/dashboard/hooks/useRanking";
import { useStats } from "@/features/dashboard/hooks/useStats";
import { useGames } from "@/features/games/hooks/useGames";
import FormSelect from "@/core/ui/FormSelect";
import Pagination from "@/core/ui/Pagination/Pagination";
import { useState } from "react";

const SCORES_PER_PAGE = 20;

export default function ScoresPage() {
  const [gameId, setGameId] = useState("");
  const [page, setPage] = useState(1);
  const { data: ranking, isLoading, isError } = useRanking(
    gameId ? Number(gameId) : undefined,
    page,
    SCORES_PER_PAGE,
  );
  const gamesQuery = useGames("", 1, 1000);
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const scores: ScoreRowData[] =
    ranking?.data.map((entry) => ({
      position: entry.position,
      name: entry.playerName,
      handle: entry.player,
      game: entry.game,
      score: entry.score,
      games: entry.games,
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
          <ScoresHeader
            title="Clasificación de GameSpace"
            filterLabel="Clasificación General"
            filter={(
              <div className="w-48 sm:w-64">
                <FormSelect
                  name="ranking-game"
                  value={gameId}
                  placeholder="Todos los videojuegos"
                  options={[
                    { label: "Todos los videojuegos", value: "" },
                    ...(gamesQuery.data?.data?.map((game) => ({ label: game.name, value: String(game.id) })) ?? []),
                  ]}
                  required={false}
                  aria-label="Filtrar por videojuego"
                  onChange={(value) => {
                    setGameId(value);
                    setPage(1);
                  }}
                />
              </div>
            )}
          />
          <ScoresTable players={scores} isLoading={isLoading} isError={isError} />
          {ranking && ranking.totalRecords > SCORES_PER_PAGE && (
            <Pagination className="justify-center" aria-label="Paginación de clasificación">
              <Pagination.Content className="justify-center">
                <Pagination.Item>
                  <Pagination.Previous
                    type="button"
                    isDisabled={page === 1}
                    aria-label="Página anterior"
                    onPress={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                  >
                    <Pagination.PreviousIcon />
                    <span className="sr-only">Página anterior</span>
                  </Pagination.Previous>
                </Pagination.Item>
                {Array.from({ length: Math.ceil(ranking.totalRecords / SCORES_PER_PAGE) }, (_, index) => index + 1).map((pageNumber) => (
                  <Pagination.Item key={pageNumber}>
                    <Pagination.Link
                      type="button"
                      isActive={pageNumber === page}
                      aria-label={`Página ${pageNumber}`}
                      onPress={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next
                    type="button"
                    isDisabled={page === Math.ceil(ranking.totalRecords / SCORES_PER_PAGE)}
                    aria-label="Página siguiente"
                    onPress={() => setPage((currentPage) => Math.min(Math.ceil(ranking.totalRecords / SCORES_PER_PAGE), currentPage + 1))}
                  >
                    <span className="sr-only">Página siguiente</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </section>
      </div>
    </main>
  );
}
