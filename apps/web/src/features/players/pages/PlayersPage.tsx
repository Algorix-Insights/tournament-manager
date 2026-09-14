import PageHeader from "../../../core/ui/HeaderPages/PageHeader";
import { UsersRound, Gamepad2 } from "lucide-react";
import floralRockCharacter from "@/assets/floral-rock-character.png";
import floralCoin from "@/assets/floral-coin.png";
import QuickActionCard from "../../../core/ui/QuickActionCard";
import SearchInput from "../components/SearchInput";
import PlayersTable from "../components/PlayersTable";

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
              value: 128,
              label: "Jugadores Registrados",
            },
            {
              icon: <Gamepad2 className="size-5" />,
              value: 36,
              label: "Videojuegos Registrados",
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
          ></QuickActionCard>

          <QuickActionCard
            title="Registrar Puntos a Jugadores"
            bgColor="bg-[#FCD984]"
            textColor="text-[#101827]"
            image={floralCoin}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
          ></QuickActionCard>
        </section>

  <SearchInput placeholder="Buscar participante" />
  <PlayersTable players={players} />
      </div>
    </main>
  );
}
