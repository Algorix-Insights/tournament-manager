import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import { UsersRound, Gamepad2 } from "lucide-react";
import floralGameIconController from "@/assets/floral-game-icon-controller.png"
import QuickActionCard from "@/core/ui/QuickActionCard";
import SearchInput from "@/features/players/components/SearchInput";
import GameTile from "@/features/games/components/GameTile";
import RegisterGameModal, { type RegisterGameData } from "@/features/games/components/RegisterGameModal";
import DeleteGameModal from "@/features/games/components/DeleteGameModal";
import QueryStateView from "@/core/ui/QueryStateView";
import Pagination from "@/core/ui/Pagination/Pagination";
import { getApiErrorMessage } from "@/features/games/api/games";
import { useCreateGame, useDeleteGame, useGames, useUpdateGame } from "@/features/games/hooks/useGames";
import { useGenres } from "@/features/games/hooks/useGenres";
import type { Game } from "@/features/games/games.types";
import { useCallback, useState } from "react";
import { useStats } from "@/features/dashboard/hooks/useStats";

const GAME_CARD_COLORS = ["bg-[#F6EAF3]", "bg-[#E4DEF5]"];
const GAMES_PER_PAGE = 20;


export default function GamesPage() {
  const [isRegisterGameOpen, setIsRegisterGameOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data, error, isError, isLoading, refetch } = useGames(search, page, GAMES_PER_PAGE);
  const { data: stats, isLoading: isStatsLoading } = useStats();
  const genresQuery = useGenres();
  const createGameMutation = useCreateGame();
  const updateGameMutation = useUpdateGame();
  const deleteGameMutation = useDeleteGame();
  const games = data?.data ?? [];
  const totalPages = Math.ceil((data?.totalRecords ?? 0) / GAMES_PER_PAGE);
  const isSubmitting = createGameMutation.isPending || updateGameMutation.isPending;

  const closeGameModal = useCallback(() => {
    setIsRegisterGameOpen(false);
    setEditingGame(null);
    setActionError(null);
  }, []);

  const openCreateGameModal = useCallback(() => {
    setEditingGame(null);
    setActionError(null);
    setIsRegisterGameOpen(true);
  }, []);

  const openEditGameModal = useCallback((game: Game) => {
    setEditingGame(game);
    setActionError(null);
    setIsRegisterGameOpen(true);
  }, []);

  const handleRegisterGame = (data: RegisterGameData) => {
    setActionError(null);
    const onSuccess = () => closeGameModal();
    const onError = (error: unknown) => setActionError(getApiErrorMessage(error));

    if (editingGame) {
      updateGameMutation.mutate({ id: editingGame.id, data }, { onSuccess, onError });
      return;
    }

    createGameMutation.mutate(data, { onSuccess, onError });
  };

  const handleDeleteGame = (game: Game) => {
    setGameToDelete(game);
  };

  const confirmDeleteGame = () => {
    if (!gameToDelete) return;

    const gameId = gameToDelete.id;
    setGameToDelete(null);
    setActionError(null);
    deleteGameMutation.mutate(gameId, {
      onError: (error) => setActionError(getApiErrorMessage(error)),
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Videojuegos</h2>

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

        <section className="grid gap-4" aria-label="Acciones rápidas">
          <QuickActionCard
            title="Registrar Nuevos Videojuegos"
            bgColor="bg-[#8B61F9]"
            textColor="text-white"
            image={floralGameIconController}
            imageClassName="absolute -right-10 top-1/2 h-80 w-80 -translate-y-1/2 object-contain sm:-right-8 sm:h-120 sm:w-120"
            onClick={openCreateGameModal}
          />
        </section>

        <SearchInput
          placeholder="Buscar juego"
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {actionError && !isRegisterGameOpen && (
          <p role="alert" className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {actionError}
          </p>
        )}

        <QueryStateView
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={games.length === 0}
          onRetry={refetch}
          loadingMessage="Cargando videojuegos..."
          emptyTitle="No hay videojuegos registrados"
          emptyMessage="Registra un videojuego para verlo aquí."
        >
          <section className="grid grid-cols-[200px] justify-center gap-2 sm:grid-cols-[repeat(2,200px)] md:grid-cols-[repeat(3,200px)] lg:grid-cols-[repeat(5,200px)]" aria-label="Videojuegos registrados">
            {games.map((game, index) => (
              <GameTile
                key={game.id}
                name={game.name}
                genre={game.genre.name}
                bgColor={GAME_CARD_COLORS[index % GAME_CARD_COLORS.length]}
                onEdit={() => openEditGameModal(game)}
                onDelete={() => handleDeleteGame(game)}
                isDeleting={deleteGameMutation.isPending && deleteGameMutation.variables === game.id}
              />
            ))}
          </section>
        </QueryStateView>
        {totalPages > 1 && (
          <Pagination className="justify-center" aria-label="Paginación de videojuegos">
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
      <RegisterGameModal
        isOpen={isRegisterGameOpen}
        onClose={closeGameModal}
        onSubmit={handleRegisterGame}
        genres={genresQuery.data?.data}
        initialGame={editingGame}
        errorMessage={actionError ?? (genresQuery.isError ? getApiErrorMessage(genresQuery.error) : null)}
        isSubmitting={isSubmitting}
      />
      <DeleteGameModal game={gameToDelete} onClose={() => setGameToDelete(null)} onConfirm={confirmDeleteGame} />
    </main>
  );
}
