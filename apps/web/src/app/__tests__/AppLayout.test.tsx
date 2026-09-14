import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import api from '@/core/api/axios';
import AppLayout from '@/app/AppLayout';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');

describe('AppLayout', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  test('searches players from the navbar using the first page and result limit', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [{ id: 8, name: 'Carlos Mendoza', gamertag: 'ShadowQA', email: 'carlos@test.com', createdAt: '2026-03-12T12:00:00.000Z' }],
        totalRecords: 1,
      },
    });

    renderWithQuery(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    const searchInput = screen.getByRole('textbox', { name: 'Buscar participante' });
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'Carlos' } });

    expect(await screen.findByText('Carlos Mendoza')).toBeInTheDocument();
    expect(mockedGet).toHaveBeenCalledWith('/players', { params: { search: 'Carlos', page: 1, limit: 8 } });
  });
});
