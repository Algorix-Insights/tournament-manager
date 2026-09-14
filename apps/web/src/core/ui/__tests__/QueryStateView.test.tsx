import { expect, test, describe, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import QueryStateView from '@/core/ui/QueryStateView';

describe('QueryStateView and UI state components', () => {
  test('renders loading skeleton when isLoading is true', () => {
    render(
      <QueryStateView isLoading={true} loadingMessage="Loading records...">
        <div>Actual Content</div>
      </QueryStateView>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading records...')).toBeInTheDocument();
    expect(screen.queryByText('Actual Content')).not.toBeInTheDocument();
  });

  test('renders error alert with retry button when isError is true', () => {
    const handleRetry = jest.fn();
    render(
      <QueryStateView
        isLoading={false}
        isError={true}
        error={new Error('Network error connecting to tournament server')}
        onRetry={handleRetry}
      >
        <div>Actual Content</div>
      </QueryStateView>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network error connecting to tournament server')).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Actual Content')).not.toBeInTheDocument();
  });

  test('renders empty state when isEmpty is true', () => {
    render(
      <QueryStateView
        isLoading={false}
        isEmpty={true}
        emptyTitle="No players found"
        emptyMessage="Create a new player to get started"
        emptyAction={<button>Add Player</button>}
      >
        <div>Actual Content</div>
      </QueryStateView>
    );

    expect(screen.getByRole('region', { name: 'No players found' })).toBeInTheDocument();
    expect(screen.getByText('Create a new player to get started')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Player' })).toBeInTheDocument();
    expect(screen.queryByText('Actual Content')).not.toBeInTheDocument();
  });

  test('renders content without background status indicators', () => {
    render(
      <QueryStateView isLoading={false}>
        <div>Active Tournament Content</div>
      </QueryStateView>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Active Tournament Content')).toBeInTheDocument();
  });
});
