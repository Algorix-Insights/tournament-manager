import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import App from '@/app/App'

test('renders the tournament manager heading', () => {
  render(<App />)
  expect(screen.getByRole('main')).toHaveClass('bg-background', 'text-foreground')
  expect(
    screen.getByRole('heading', { name: /tournament manager/i }),
  ).toBeInTheDocument()
})
