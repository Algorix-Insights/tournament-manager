import { CalendarCellIndicator as HeroCalendarCellIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarCellIndicator(props: Readonly<ComponentProps<typeof HeroCalendarCellIndicator>>) {
  return <HeroCalendarCellIndicator {...props} />
}

