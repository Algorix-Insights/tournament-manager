import ArrowButton from "../../../core/ui/ArrowButton";
import Skeleton from "../../../core/ui/Skeleton";
import { useRanking } from "../hooks/useRanking";

interface GameSpaceClassificationProps {
    onViewScores: () => void;
}

export default function GameSpaceClassification({ onViewScores }: GameSpaceClassificationProps) {
    const { data: ranking, isLoading: isRankingLoading } = useRanking();

    return (
        <section className="overflow-hidden" aria-labelledby="score-summary">
            <div className="mb-5 flex items-end justify-between gap-4 overflow-hidden rounded-[22px] bg-[#eeeafa] p-2 sm:p-5 ">
                <div className="flex items-center gap-3"><span className="h-10 w-3 shrink-0 rounded-full bg-[#8B61F9]" aria-hidden="true" /><h2 id="score-summary" className="font-manrope-bold text-lg tracking-[-0.03em]">Clasificación de GameSpace</h2></div>
                <label className="hidden items-center gap-5 rounded-full bg-white px-4 py-3 text-xs sm:flex">Clasificación general <span aria-hidden="true">⌄</span><span className="sr-only">Filtrar clasificación</span></label>
            </div>
            <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
                <aside className="hidden rounded-[18px] bg-[#FBCCF0] p-5 lg:flex lg:flex-col lg:justify-between h-42"><h3 className="font-manrope-bold text-lg leading-tight">Ver clasificación<br />de puntos</h3><ArrowButton onClick={onViewScores}>¡Vamos!</ArrowButton></aside>
                <div className="min-w-0">
                    <div className="mb-2 hidden grid-cols-[60px_1fr_140px_80px] items-center px-4 text-[12px] text-[#000000] sm:grid"><div className="col-span-4 grid grid-cols-subgrid"><span>Posición</span><span>Jugador</span><span>Juego</span><span className="text-right">Puntuación</span></div></div>
                    <div className="space-y-2" aria-busy={isRankingLoading}>
                        {isRankingLoading ? Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="grid grid-cols-[28px_1fr_auto] items-center gap-2 rounded-full bg-white px-3 py-3 sm:grid-cols-[40px_1fr_140px_70px] sm:px-4">
                                <Skeleton className="h-4 w-5 rounded" />
                                <div className="flex min-w-0 items-center gap-2">
                                    <Skeleton className="size-7 shrink-0 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-28 rounded" />
                                        <Skeleton className="h-2 w-16 rounded" />
                                    </div>
                                </div>
                                <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
                                <Skeleton className="h-4 w-10 rounded" />
                            </div>
                        )) : (
                            ranking?.data.slice(0, 5).map((player) => (
                                <div
                                    key={`${player.playerId}-${player.gameId}`}
                                    className="grid grid-cols-[28px_1fr_auto] items-center gap-2 rounded-full bg-white px-3 py-3 text-xs sm:grid-cols-[40px_1fr_140px_70px] sm:px-4"
                                >
                                    <div className="contents sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:items-center">
                                        <span>{player.position}</span>

                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#d9cffb] text-xs">
                                                {player.playerName.charAt(0)}
                                            </span>
                                            <span className="min-w-0">
                                                <strong className="block truncate text-[11px]">
                                                    {player.playerName}
                                                </strong>
                                                <small className="block text-[9px] text-[#8f929b]">
                                                    {player.player}
                                                </small>
                                            </span>
                                        </div>

                                        <span className="hidden max-w-30 truncate rounded-full border border-[#e8e7eb] px-3 py-1 text-[9px] text-[#8f929b] sm:inline-block">
                                            {player.game}
                                        </span>

                                        <strong className="text-right text-[#684bf3]">
                                            {player.score}
                                        </strong>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}