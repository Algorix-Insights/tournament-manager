import { CalendarHeading as HeroCalendarHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarHeading(props: Readonly<ComponentProps<typeof HeroCalendarHeading>>) {
  return <HeroCalendarHeading {...props} />
}

