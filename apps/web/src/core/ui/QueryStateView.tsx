import type { ReactNode } from 'react';
import { LoadingSkeleton } from '@/core/ui/LoadingSkeleton';
import { ErrorAlert } from '@/core/ui/ErrorAlert';
import { EmptyState } from '@/core/ui/EmptyState';

export interface QueryStateViewProps {
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
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
    return <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />;
  }

  return <div className="relative space-y-3">{children}</div>;
}

export default QueryStateView;
