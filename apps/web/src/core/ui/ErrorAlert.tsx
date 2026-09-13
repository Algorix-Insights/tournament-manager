export function ErrorAlert({
  error,
  onRetry,
}: Readonly<{
  error?: Error | null;
  onRetry?: () => void;
}>) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-red-300 space-y-3"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-red-200">Failed to load data</h4>
          <p className="text-sm mt-1 text-red-300/90">
            {error?.message || 'An unexpected error occurred while fetching information.'}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;
