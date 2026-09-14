import { useCallback, useState } from "react";
import { Gamepad2, UsersRound } from "lucide-react";
import { useNavigate } from "react-router";
import PageHeader from "../../../core/ui/HeaderPages/PageHeader";
import RegisterGameModal, { type RegisterGameData } from "../../games/components/RegisterGameModal";
import RegisterPlayerModal, { type RegisterPlayerData } from "../../players/components/RegisterPlayerModal";
import RegisterPointsModal, { type RegisterPointsData } from "../../scores/components/RegisterPointsModal";
import GameSpaceClassification from "../components/GameSpaceClassification";
import QuickActions from "../components/QuickActions";

import { useStats } from "../hooks/useStats";
import { getApiErrorMessage } from "@/features/games/api/games";
import { useCreateGame, useGames } from "@/features/games/hooks/useGames";
import { useGenres } from "@/features/games/hooks/useGenres";
import { useCreatePlayer, usePlayers } from "@/features/players/hooks/usePlayers";
import { useCreateScore } from "@/features/scores/hooks/useScores";

type ModalType = "player" | "game" | "points" | null;

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data: players } = usePlayers("", 1, 1000);
  const { data: games } = useGames("", 1, 1000);
  const genresQuery = useGenres();
  const createPlayerMutation = useCreatePlayer();
  const createGameMutation = useCreateGame();
  const createScoreMutation = useCreateScore();

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setActionError(null);
  }, []);

  const handleRegisterPlayer = (data: RegisterPlayerData) => {
    setActionError(null);
    createPlayerMutation.mutate(data, {
      onSuccess: closeModal,
      onError: (error) => setActionError(getApiErrorMessage(error)),
    });
  };

  const handleRegisterGame = (data: RegisterGameData) => {
    setActionError(null);
    createGameMutation.mutate(data, {
      onSuccess: closeModal,
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
      onSuccess: closeModal,
      onError: (error) => setActionError(getApiErrorMessage(error)),
    });
  };

  const { data: stats, isLoading: isStatsLoading } = useStats();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Dashboard</h2>
      <div className="mx-auto flex max-w-375 flex-col gap-6">
        <PageHeader
          subtitle="Listo para la aventura"
          metrics={[
            { icon: <UsersRound className="size-6" />, value: stats?.totalPlayers ?? "", label: "Jugadores Registrados", isLoading: isStatsLoading },
            { icon: <Gamepad2 className="size-7" />, value: stats?.totalGames ?? "", label: "Videojuegos Registrados", isLoading: isStatsLoading },
          ]}
        />
        <QuickActions
          onRegisterPlayer={() => { setActionError(null); setActiveModal("player"); }}
          onRegisterGame={() => { setActionError(null); setActiveModal("game"); }}
          onRegisterPoints={() => { setActionError(null); setActiveModal("points"); }}
        />
        <GameSpaceClassification onViewScores={() => navigate("/scores")} />
      </div>
      <RegisterPlayerModal
        isOpen={activeModal === "player"}
        onClose={closeModal}
        onSubmit={handleRegisterPlayer}
        errorMessage={actionError}
        isSubmitting={createPlayerMutation.isPending}
      />
      <RegisterGameModal
        isOpen={activeModal === "game"}
        onClose={closeModal}
        onSubmit={handleRegisterGame}
        genres={genresQuery.data}
        errorMessage={actionError}
        isSubmitting={createGameMutation.isPending}
      />
      <RegisterPointsModal
        isOpen={activeModal === "points"}
        onClose={closeModal}
        onSubmit={handleRegisterPoints}
        players={players?.data}
        games={games?.data}
        errorMessage={actionError}
        isSubmitting={createScoreMutation.isPending}
      />
    </main>
  );
}
