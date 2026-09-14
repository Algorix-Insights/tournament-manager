import { expect, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AppRoutes from '@/routes/App.routes'
import { renderWithQuery } from '@/tests/query-test-utils'

test.each([
  ['/', 'Dashboard'],
  ['/dashboard', 'Dashboard'],
  ['/players', 'Jugadores'],
  ['/games', 'Videojuegos'],
  ['/scores', 'Clasificacion'],
  ['/missing', 'Dashboard'],
])('renders %s as %s', (path, heading) => {
  renderWithQuery(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})
