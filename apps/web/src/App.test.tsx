import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the tournament manager heading', () => {
  render(<App />)
  expect(
    screen.getByRole('heading', { name: /tournament manager/i }),
  ).toBeInTheDocument()
})
