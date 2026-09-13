import type { ReactNode } from 'react';
import { BackgroundSyncBadge } from './BackgroundSyncBadge';
import { StaleDataBadge } from './StaleDataBadge';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorAlert } from './ErrorAlert';
import { EmptyState } from './EmptyState';

export interface QueryStateViewProps {
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  isFetching?: boolean;
  isStale?: boolean;
  onRetry?: () => void;
  loadingMessage?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyAction?: ReactNode;
  children: ReactNode;
}

export function QueryStateView({
  isLoading,
  isError,
  error,
  isEmpty,
  isFetching,
  isStale,
  onRetry,
  loadingMessage,
  emptyTitle,
  emptyMessage,
  emptyAction,
  children,
}: Readonly<QueryStateViewProps>) {
  if (isLoading) {
    return <LoadingSkeleton message={loadingMessage} />;
  }

  if (isError) {
    return <ErrorAlert error={error} onRetry={onRetry} />;
  }

  if (isEmpty) {
    return (
      <div className="space-y-3">
        {(isFetching || isStale) && (
          <div className="flex items-center gap-2 justify-end">
            <BackgroundSyncBadge isFetching={isFetching} />
            <StaleDataBadge isStale={isStale} onRefresh={onRetry} />
          </div>
        )}
        <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />
      </div>
    );
  }

  return (
    <div className="relative space-y-3">
      {(isFetching || isStale) && (
        <div className="flex items-center gap-2 justify-end mb-2">
          <BackgroundSyncBadge isFetching={isFetching} />
          <StaleDataBadge isStale={isStale} onRefresh={onRetry} />
        </div>
      )}
      {children}
    </div>
  );
}

export default QueryStateView;
