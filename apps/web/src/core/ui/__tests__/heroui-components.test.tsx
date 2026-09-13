import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Button from '@/core/ui/Button'
import Card from '@/core/ui/Card/Card'

test('renders an editable local HeroUI component', () => {
  render(<Button>Save</Button>)

  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
})

test('keeps compound components available from the local parent', () => {
  render(
    <Card>
      <Card.Content>Card content</Card.Content>
    </Card>,
  )

  expect(screen.getByText('Card content')).toBeInTheDocument()
})
