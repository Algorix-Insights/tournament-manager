import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AppRoutes from '@/routes/App.routes'

test.each([
  ['/', 'Tournament Manager'],
  ['/dashboard', 'Dashboard'],
  ['/players', 'Players'],
  ['/games', 'Games'],
  ['/scores', 'Scores'],
  ['/missing', 'Tournament Manager'],
])('renders %s as %s', (path, heading) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})
