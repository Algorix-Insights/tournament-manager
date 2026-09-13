import type { ReactNode } from 'react';

export function EmptyState({
  title = 'No items found',
  message = 'There is currently no data to display.',
  action,
}: Readonly<{
  title?: string;
  message?: string;
  action?: ReactNode;
}>) {
  return (
    <section
      aria-label={title}
      className="rounded-lg border border-dashed border-slate-800 p-8 text-center"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-400 text-xl">
        ∅
      </div>
      <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm mx-auto">{message}</p>
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </section>
  );
}

export default EmptyState;
