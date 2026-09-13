import { CalendarGridHeader as HeroCalendarGridHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarGridHeader(props: Readonly<ComponentProps<typeof HeroCalendarGridHeader>>) {
  return <HeroCalendarGridHeader {...props} />
}

