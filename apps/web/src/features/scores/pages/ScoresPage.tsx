import { UsersRound, Gamepad2 } from "lucide-react";
import PageHeader from "@/core/ui/HeaderPages/PageHeader";
import ScoresHeader from "@/features/scores/components/ScoresHeader";
import ScoresTable from "@/features/scores/components/ScoresTable";
import type { ScoreRowData } from "@/features/scores/components/ScoreRow";

const scores: ScoreRowData[] = [
  { position: 1, name: "Boki Rodríguez", handle: "Boki-02", game: "Minecraft", score: 450 },
  { position: 2, name: "Sebastián VP", handle: "In 2 days", game: "Brawl Start", score: 423 },
  { position: 3, name: "Churi Delez", handle: "In 2 days", game: "Efootball 26", score: 345 },
  { position: 4, name: "Churi Delez", handle: "In 2 days", game: "Efootball 26", score: 345 },
];

export default function ScoresPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f8] px-5 py-6 text-[#111827] sm:px-8 lg:px-12">
      <h2 className="sr-only">Clasificacion</h2>
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

        <section className="flex flex-col gap-3" aria-labelledby="scores-title">
          <ScoresHeader title="Clasificación de GameSpace" filterLabel="Clasificación General" />
          <ScoresTable players={scores} />
        </section>
      </div>
    </main>
  );
}
