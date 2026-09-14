import PageHeader from "../../../core/ui/HeaderPages/PageHeader";
import { UsersRound, Gamepad2 } from "lucide-react";
import floralGameIconController from "@/assets/floral-game-icon-controller.png"
import QuickActionCard from "../../../core/ui/QuickActionCard";
import SearchInput from "../../players/components/SearchInput";
import GameTile from "@/features/games/components/GameTile";

const games = [
  { name: "Minecraft", genre: "Sandbox" },
  { name: "LOL", genre: "Sandbox" },
  { name: "Brawl Stars", genre: "Sandbox" },
  { name: "LOL", genre: "Sandbox" },
  { name: "Brawl Stars", genre: "Sandbox" },
];

const GAME_CARD_COLORS = ["bg-[#F6EAF3]", "bg-[#E4DEF5]"];


export default function GamesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Games</h2>

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

        <section className="grid gap-4" aria-label="Acciones rápidas">
          <QuickActionCard
            title="Registrar Nuevos Videojuegos"
            bgColor="bg-[#8B61F9]"
            textColor="text-white"
            image={floralGameIconController}
            imageClassName="absolute -right-10 top-1/2 h-80 w-80 -translate-y-1/2 object-contain sm:-right-8 sm:h-120 sm:w-120"
          />
        </section>

        <SearchInput placeholder="Buscar juego" />

        <section className="grid grid-cols-[200px] gap-2 sm:grid-cols-[repeat(2,200px)] md:grid-cols-[repeat(3,200px)] lg:grid-cols-[repeat(5,200px)]" aria-label="Videojuegos registrados">
          {games.map((game, index) => (
            <GameTile
              key={`${game.name}-${index}`}
              name={game.name}
              genre={game.genre}
              bgColor={GAME_CARD_COLORS[index % GAME_CARD_COLORS.length]}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
