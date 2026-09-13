import { CalendarHeaderCell as HeroCalendarHeaderCell } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarHeaderCell(props: Readonly<ComponentProps<typeof HeroCalendarHeaderCell>>) {
  return <HeroCalendarHeaderCell {...props} />
}

