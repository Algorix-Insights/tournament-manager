import floralRockCharacter from "@/assets/floral-rock-character.png";
import floralGameController from "@/assets/floral-game-cotroller.png";
import floralCoin from "@/assets/floral-coin.png";
import { UsersRound, Gamepad2 } from "lucide-react";
import QuickActionCard from "@/core/ui/QuickActionCard";
import ArrowButton from "@/core/ui/ArrowButton";
import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import RegisterPlayerModal, { type RegisterPlayerData } from "@/features/players/components/RegisterPlayerModal";
import { useState } from "react";
import RegisterGameModal, { type RegisterGameData } from "@/features/games/components/RegisterGameModal";
import RegisterPointsModal, { type RegisterPointsData } from "@/features/scores/components/RegisterPointsModal";
import { useNavigate } from "react-router";

const players = [
  {
    position: "1",
    name: "Boki Rodríguez",
    handle: "Boki-02",
    game: "Minecraft",
    score: "450",
  },
  {
    position: "2",
    name: "Sebastián VP",
    handle: "In 2 days",
    game: "Brawl Start",
    score: "423",
  },
  {
    position: "3",
    name: "Churi Delez",
    handle: "In 2 days",
    game: "Efootball 26",
    score: "345",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isRegisterPlayerOpen, setIsRegisterPlayerOpen] = useState(false);
  const [isRegisterGameOpen, setIsRegisterGameOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

  const handleRegisterPlayer = (data: RegisterPlayerData) => {
    console.log("Register player payload", data);
    setIsRegisterPlayerOpen(false);
  };

  const handleRegisterGame = (data: RegisterGameData) => {
    console.log("Register game payload", data);
    setIsRegisterGameOpen(false);
  };

  const handleRegisterPoints = (data: RegisterPointsData) => {
    console.log("Register points payload", data);
    setIsPointsModalOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Dashboard</h2>
      <div className="mx-auto flex max-w-290 flex-col gap-6">
        {/*Bienvenida a administrar*/}
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

        {/*Sección de acciones rápidas*/}
        <section
          className="grid gap-4 md:grid-cols-2 md:grid-rows-[200px_auto]"
          aria-label="Acciones rápidas"
        >
          {/*Registrar nuevos jugadores*/}
          <QuickActionCard
            title="Registrar Nuevos Jugadores"
            bgColor="bg-[#FBCCF0]"
            textColor="text-[#101827]"
            image={floralRockCharacter}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
            onClick={() => setIsRegisterPlayerOpen(true)}
          />
          {/*Registrar nuevos videojuegos*/}
          <QuickActionCard
            title="Registrar Nuevos Videojuegos"
            bgColor="bg-[#8B61F9]"
            textColor="text-white"
            image={floralGameController}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
            onClick={() => setIsRegisterGameOpen(true)}
          />

          <article
            className="flex flex-col gap-3"
            aria-label="Resumen de puntuaciones"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-3 rounded-full bg-[#8B61F9] shrink-0"
                aria-hidden="true"
              />
              <p className="font-manrope-bold text-lg leading-tight">
                Acerca De Las Puntuaciones
                <br />
                Del Torneo
              </p>
            </div>
            <div
              className="grid grid-cols-2 gap-3"
              aria-label="Resumen de puntuaciones"
            >
              <div className="flex min-h-42.5 flex-col justify-between rounded-[18px] bg-[#eeeafa] p-5">
                <strong className="text-2xl tracking-[-0.04em]">365 pts</strong>
                <p className="max-w-24 text-[16px] leading-tight text-[#8f929b]">
                  Promedio de puntuación
                </p>
              </div>
              <div className="flex min-h-42.5 flex-col justify-between rounded-[18px] bg-[#eeeafa] p-5">
                <strong className="text-2xl tracking-[-0.04em]">
                  43 registros
                </strong>
                <p className="max-w-60 text-[16px] leading-tight text-[#8f929b]">
                  Total de puntuaciones registradas
                </p>
              </div>
            </div>
          </article>

          {/*Registrar puntos a jugadores*/}
          <QuickActionCard
            title="Registrar Puntos a Jugadores"
            bgColor="bg-[#FCD984]"
            textColor="text-[#101827]"
            image={floralCoin}
            imageClassName="absolute -bottom-5 -right-4.5 h-46.25 w-46.25 object-contain sm:right-2"
            onClick={() => setIsPointsModalOpen(true)}
          />
        </section>

        <section className="overflow-hidden " aria-labelledby="score-summary">
          <div className="mb-5 flex items-end justify-between gap-4 bg-[#eeeafa] overflow-hidden rounded-[22px] p-2 sm:p-5">
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-3 rounded-full bg-[#8B61F9] shrink-0"
                aria-hidden="true"
              />
              <h2
                id="score-summary"
                className="font-manrope-bold text-lg tracking-[-0.03em]"
              >
                Clasificación de GameSpace
              </h2>
            </div>
            <label className="hidden items-center gap-5 rounded-full bg-white px-4 py-3 text-xs sm:flex">
              Clasificación general <span aria-hidden="true">⌄</span>
              <span className="sr-only">Filtrar clasificación</span>
            </label>
          </div>
          <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
            <aside className="hidden rounded-[18px] bg-[#FBCCF0] p-5 lg:flex lg:flex-col lg:justify-between">
              <h3 className="font-manrope-bold text-lg leading-tight">
                Ver clasificación
                <br />
                de puntos
              </h3>
              <ArrowButton onClick={() => navigate("/scores")}>¡Vamos!</ArrowButton>
            </aside>
            <div className="min-w-0">
              <div className="mb-2 hidden grid-cols-[60px_1fr_140px_80px] items-center px-4 text-[12px] text-[#000000] sm:grid">
                <div className="col-span-4 grid grid-cols-subgrid">
                  <span>Posición</span>
                  <span>Jugador</span>
                  <span>Juego</span>
                  <span className="text-right">Puntuación</span>
                </div>
              </div>
              <div className="space-y-2">
                {players.map((player) => (
                  <div
                    key={player.position}
                    className="grid grid-cols-[28px_1fr_auto] items-center gap-2 rounded-full bg-white px-3 py-3 text-xs sm:grid-cols-[40px_1fr_140px_70px] sm:px-4"
                  >
                    <div className="contents sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:items-center">
                      <span>{player.position}</span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#d9cffb] text-xs">
                          {player.name.charAt(0)}
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate text-[11px]">
                            {player.name}
                          </strong>
                          <small className="block text-[9px] text-[#8f929b]">
                            {player.handle}
                          </small>
                        </span>
                      </div>
                      <span className="hidden rounded-full border border-[#e8e7eb] px-3 py-1 text-[9px] text-[#8f929b] sm:block">
                        {player.game}
                      </span>
                      <strong className="text-right text-[#684bf3]">
                        {player.score}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <RegisterPlayerModal isOpen={isRegisterPlayerOpen} onClose={() => setIsRegisterPlayerOpen(false)} onSubmit={handleRegisterPlayer} />
      <RegisterGameModal isOpen={isRegisterGameOpen} onClose={() => setIsRegisterGameOpen(false)} onSubmit={handleRegisterGame} />
      <RegisterPointsModal isOpen={isPointsModalOpen} onClose={() => setIsPointsModalOpen(false)} onSubmit={handleRegisterPoints} />
    </main>
  );
}
