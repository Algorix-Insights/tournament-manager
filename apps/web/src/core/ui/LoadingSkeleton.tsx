export function LoadingSkeleton({
  message = 'Loading...',
}: Readonly<{
  message?: string;
}>) {
  return (
    <output
      aria-busy="true"
      aria-label={message}
      className="block space-y-3 py-6 animate-pulse"
    >
      <div className="h-5 w-1/3 rounded bg-slate-800" />
      <div className="h-10 w-full rounded bg-slate-800/60" />
      <div className="h-10 w-full rounded bg-slate-800/40" />
      <div className="h-10 w-full rounded bg-slate-800/20" />
      <p className="sr-only">{message}</p>
    </output>
  );
}

export default LoadingSkeleton;
