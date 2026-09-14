import floralCoin from "@/assets/floral-coin.png";
import floralGameController from "@/assets/floral-game-cotroller.png";
import floralRockCharacter from "@/assets/floral-rock-character.png";
import QuickActionCard from "../../../core/ui/QuickActionCard";
import SimpleCard from "./SimpleCard";
import { SectionTitle } from "./StatSectionTitle";

import { useStats } from "../hooks/useStats";

interface QuickActionsProps {
    onRegisterPlayer: () => void;
    onRegisterGame: () => void;
    onRegisterPoints: () => void;
}

export default function QuickActions({ onRegisterPlayer, onRegisterGame, onRegisterPoints }: QuickActionsProps) {
    const { data: stats, isLoading: isStatsLoading } = useStats();

    return (
        <section className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-[200px_auto]" aria-label="Acciones rápidas">
            <QuickActionCard title="Registrar Nuevos Jugadores" bgColor="bg-[#FBCCF0]" textColor="text-[#101827]" image={floralRockCharacter} imageClassName="absolute -bottom-5 -right-4.5 size-70 object-contain sm:right-2" onClick={onRegisterPlayer} />
            <QuickActionCard title="Registrar Nuevos Videojuegos" bgColor="bg-[#8B61F9]" textColor="text-white" image={floralGameController} imageClassName="absolute -bottom-2 -right-4.5 size-60 object-contain sm:right-2" onClick={onRegisterGame} />

            <article className="flex flex-col gap-3" aria-label="Resumen de puntuaciones">
                <SectionTitle>Acerca De Las Puntuaciones Del Torneo</SectionTitle>
                <div className="grid grid-cols-2 gap-3" aria-label="Resumen de puntuaciones">
                    <SimpleCard
                        value={stats ? `${stats.averageScore} pts` : ""}
                        label="Promedio de puntuación"
                        isLoading={isStatsLoading}
                    />
                    <SimpleCard
                        value={stats ? `${stats.totalScores} registros` : ""}
                        label="Total de puntuaciones registradas"
                        isLoading={isStatsLoading}
                    />
                </div>
            </article>

            <QuickActionCard title="Registrar Puntos a Jugadores" bgColor="bg-[#FCD984]" textColor="text-[#101827]" image={floralCoin} imageClassName="absolute -bottom-5 -right-4.5 size-60 object-contain sm:right-2" onClick={onRegisterPoints} />
        </section>
    );
}