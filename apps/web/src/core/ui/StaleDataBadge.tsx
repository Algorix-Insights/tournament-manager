export function StaleDataBadge({
  isStale,
  onRefresh,
}: Readonly<{
  isStale?: boolean;
  onRefresh?: () => void;
}>) {
  if (!isStale) return null;
  return (
    <button
      type="button"
      onClick={onRefresh}
      title="Click to refresh stale cache"
      className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors cursor-pointer"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Stale Data (click to refresh)
    </button>
  );
}

export default StaleDataBadge;
