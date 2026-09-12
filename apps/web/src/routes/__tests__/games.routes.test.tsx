import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import GamesRoutes from '@/routes/games.routes'

test('renders GamesPage at root of games module', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <GamesRoutes />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Games' })).toBeInTheDocument()
})
