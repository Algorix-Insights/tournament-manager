import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import App from '@/app/App'

test('renders the app shell', () => {
  render(<App />)
  expect(screen.getByRole('main')).toHaveClass('bg-background', 'text-foreground')
})
