import { useState } from "react";
import { Gamepad2, UsersRound } from "lucide-react";
import { useNavigate } from "react-router";
import PageHeader from "../../../core/ui/HeaderPages/PageHeader";
import RegisterGameModal, { type RegisterGameData } from "../../games/components/RegisterGameModal";
import RegisterPlayerModal, { type RegisterPlayerData } from "../../players/components/RegisterPlayerModal";
import RegisterPointsModal, { type RegisterPointsData } from "../../scores/components/RegisterPointsModal";
import GameSpaceClassification from "../components/GameSpaceClassification";
import QuickActions from "../components/QuickActions";

import { useStats } from "../hooks/useStats";

type ModalType = "player" | "game" | "points" | null;

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleRegisterPlayer = (data: RegisterPlayerData) => {
    console.log("Register player payload", data);
    setActiveModal(null);
  };

  const handleRegisterGame = (data: RegisterGameData) => {
    console.log("Register game payload", data);
    setActiveModal(null);
  };

  const handleRegisterPoints = (data: RegisterPointsData) => {
    console.log("Register points payload", data);
    setActiveModal(null);
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
          onRegisterPlayer={() => setActiveModal("player")}
          onRegisterGame={() => setActiveModal("game")}
          onRegisterPoints={() => setActiveModal("points")}
        />
        <GameSpaceClassification onViewScores={() => navigate("/scores")} />
      </div>
      <RegisterPlayerModal isOpen={activeModal === "player"} onClose={() => setActiveModal(null)} onSubmit={handleRegisterPlayer} />
      <RegisterGameModal isOpen={activeModal === "game"} onClose={() => setActiveModal(null)} onSubmit={handleRegisterGame} />
      <RegisterPointsModal isOpen={activeModal === "points"} onClose={() => setActiveModal(null)} onSubmit={handleRegisterPoints} />
    </main>
  );
}
