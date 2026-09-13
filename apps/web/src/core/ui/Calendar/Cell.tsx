import { CalendarCell as HeroCalendarCell } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarCell(props: Readonly<ComponentProps<typeof HeroCalendarCell>>) {
  return <HeroCalendarCell {...props} />
}

