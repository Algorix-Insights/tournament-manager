export function LoadingSkeleton({
  message = 'Loading...',
}: Readonly<{
  message?: string;
}>) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={message}
      className="space-y-3 py-6 animate-pulse"
    >
      <div className="h-5 w-1/3 rounded bg-slate-800" />
      <div className="h-10 w-full rounded bg-slate-800/60" />
      <div className="h-10 w-full rounded bg-slate-800/40" />
      <div className="h-10 w-full rounded bg-slate-800/20" />
      <p className="sr-only">{message}</p>
    </div>
  );
}

export default LoadingSkeleton;
