import { CalendarGrid as HeroCalendarGrid } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarGrid(props: Readonly<ComponentProps<typeof HeroCalendarGrid>>) {
  return <HeroCalendarGrid {...props} />
}

