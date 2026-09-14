import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import { UsersRound, Gamepad2 } from "lucide-react";
import floralRockCharacter from "@/assets/floral-rock-character.png";
import floralCoin from "@/assets/floral-coin.png";
import QuickActionCard from "@/core/ui/QuickActionCard";
import SearchInput from "@/features/players/components/SearchInput";
import PlayersTable from "@/features/players/components/PlayersTable";
import RegisterPlayerModal, { type RegisterPlayerData } from "@/features/players/components/RegisterPlayerModal";
import { useCallback, useState } from "react";
import RegisterPointsModal, { type RegisterPointsData } from "@/features/scores/components/RegisterPointsModal";
import QueryStateView from "@/core/ui/QueryStateView";
import Pagination from "@/core/ui/Pagination/Pagination";
import { getApiErrorMessage } from "@/features/games/api/games";
import { useGames } from "@/features/games/hooks/useGames";
import { useCreatePlayer, usePlayers } from "@/features/players/hooks/usePlayers";
import { useCreateScore } from "@/features/scores/hooks/useScores";
import { useStats } from "@/features/dashboard/hooks/useStats";

const PLAYERS_PER_PAGE = 20;

const formatDate = (date: string) => new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(date));

export default function PlayersPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const { data: stats, isLoading: isStatsLoading } = useStats();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, error, isError, isLoading, refetch } = usePlayers(search, page, PLAYERS_PER_PAGE);
  const gamesQuery = useGames("", 1, 1000);
  const createPlayerMutation = useCreatePlayer();
  const createScoreMutation = useCreateScore();
  const players = data?.data.map((player, index) => ({
    position: (page - 1) * PLAYERS_PER_PAGE + index + 1,
    name: player.name,
    handle: player.gamertag,
    email: player.email,
    registeredAt: formatDate(player.createdAt),
    games: player.games ?? [],
  })) ?? [];
  const totalPages = Math.ceil((data?.totalRecords ?? 0) / PLAYERS_PER_PAGE);

  const closeRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(false);
    setActionError(null);
  }, []);

  const closePointsModal = useCallback(() => {
    setIsPointsModalOpen(false);
    setActionError(null);
  }, []);

  const handleRegisterPlayer = (data: RegisterPlayerData) => {
    setActionError(null);
    createPlayerMutation.mutate(data, {
      onSuccess: closeRegisterModal,
      onError: (error) => setActionError(getApiErrorMessage(error)),
    });
  };

  const handleRegisterPoints = (data: RegisterPointsData) => {
    setActionError(null);
    createScoreMutation.mutate({
      playerId: Number(data.playerId),
      gameId: Number(data.gameId),
      score: data.score,
    }, {
      onSuccess: closePointsModal,
      onError: (error) => setActionError(getApiErrorMessage(error)),
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Jugadores</h2>

      <div className="mx-auto flex max-w-290 flex-col gap-6 ">
        <PageHeader
          subtitle="Listo para la aventura"
          title="Buenas tardes, Admin"
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

        <section
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          aria-label="Acciones rápidas"
        >
          <QuickActionCard
            title="Registrar Nuevos Jugadores"
            bgColor="bg-[#FBCCF0]"
            textColor="text-[#101827]"
            image={floralRockCharacter}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
            onClick={() => setIsRegisterModalOpen(true)}
          />

          <QuickActionCard
            title="Registrar Puntos a Jugadores"
            bgColor="bg-[#FCD984]"
            textColor="text-[#101827]"
            image={floralCoin}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
            onClick={() => setIsPointsModalOpen(true)}
          />
        </section>

        <SearchInput
          placeholder="Buscar participante"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {actionError && !isRegisterModalOpen && !isPointsModalOpen && (
          <p role="alert" className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {actionError}
          </p>
        )}

        <QueryStateView
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={players.length === 0}
          onRetry={refetch}
          loadingMessage="Cargando jugadores..."
          emptyTitle="No hay jugadores registrados"
          emptyMessage="Registra un jugador para verlo aquí."
        >
          <PlayersTable players={players} />
        </QueryStateView>

        {totalPages > 1 && (
          <Pagination className="justify-center" aria-label="Paginación de jugadores">
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
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
                  isDisabled={page === totalPages}
                  aria-label="Página siguiente"
                  onPress={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                >
                  <span className="sr-only">Página siguiente</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        )}
      </div>
      <RegisterPlayerModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSubmit={handleRegisterPlayer}
        errorMessage={actionError}
        isSubmitting={createPlayerMutation.isPending}
      />
      <RegisterPointsModal
        isOpen={isPointsModalOpen}
        onClose={closePointsModal}
        onSubmit={handleRegisterPoints}
        players={data?.data}
        games={gamesQuery.data?.data}
        errorMessage={actionError}
        isSubmitting={createScoreMutation.isPending}
      />
    </main>
  );
}
