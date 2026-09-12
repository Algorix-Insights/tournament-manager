import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { render, screen } from '@testing-library/react'
import App from '@/app/App'

test('exposes the tournament domains', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Players' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Games' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Scores' })).toBeInTheDocument()
})
