export function BackgroundSyncBadge({
  isFetching,
}: Readonly<{
  isFetching?: boolean;
}>) {
  if (!isFetching) return null;
  return (
    <span
      role="status"
      aria-label="Updating data in background"
      className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-500/20 animate-pulse"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
      Syncing...
    </span>
  );
}

export default BackgroundSyncBadge;
