import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import { UsersRound, Gamepad2 } from "lucide-react";
import floralRockCharacter from "@/assets/floral-rock-character.png";
import floralCoin from "@/assets/floral-coin.png";
import QuickActionCard from "@/core/ui/QuickActionCard";
import SearchInput from "@/features/players/components/SearchInput";
import PlayersTable from "@/features/players/components/PlayersTable";
import RegisterPlayerModal, { type RegisterPlayerData } from "@/features/players/components/RegisterPlayerModal";
import { useState } from "react";
import RegisterPointsModal, { type RegisterPointsData } from "@/features/scores/components/RegisterPointsModal";
import { useStats } from "@/features/dashboard/hooks/useStats";

const players = [
  {
    position: 1,
    name: "Boki Rodriguez",
    handle: "Boki-02",
    email: "Boki@gmail.com",
    registeredAt: "Marzo 12, 2026",
    mainGame: "Minecraft",
    extraGamesCount: 2,
    initiallyOpen: true,
    games: [
      { name: "Minecraft", genre: "Sandbox", rank: 2, points: 450 },
      { name: "Valorant", genre: "Sandbox", rank: 2, points: 350 },
      { name: "Bodrio Stars", genre: "Sandbox", rank: 2, points: 550 },
    ],
  },
  {
    position: 2,
    name: "Boki Rodriguez",
    handle: "Boki-02",
    email: "Boki@gmail.com",
    registeredAt: "Marzo 12, 2026",
    mainGame: "Minecraft",
    extraGamesCount: 2,
    games: [],
  },
  {
    position: 3,
    name: "Boki Rodriguez",
    handle: "Boki-02",
    email: "Boki@gmail.com",
    registeredAt: "Marzo 12, 2026",
    mainGame: "Minecraft",
    extraGamesCount: 2,
    games: [],
  },
];

export default function PlayersPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const handleRegisterPlayer = (data: RegisterPlayerData) => {
    console.log("Register player payload", data);
    setIsRegisterModalOpen(false);
  };

  const handleRegisterPoints = (data: RegisterPointsData) => {
    console.log("Register points payload", data);
    setIsPointsModalOpen(false);
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

  <SearchInput placeholder="Buscar participante" />
  <PlayersTable players={players} />
      </div>
      <RegisterPlayerModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} onSubmit={handleRegisterPlayer} />
      <RegisterPointsModal isOpen={isPointsModalOpen} onClose={() => setIsPointsModalOpen(false)} onSubmit={handleRegisterPoints} />
    </main>
  );
}
