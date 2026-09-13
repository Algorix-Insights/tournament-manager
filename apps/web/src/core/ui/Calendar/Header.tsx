import { CalendarHeader as HeroCalendarHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarHeader(props: Readonly<ComponentProps<typeof HeroCalendarHeader>>) {
  return <HeroCalendarHeader {...props} />
}

