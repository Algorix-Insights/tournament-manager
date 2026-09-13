import { CalendarGridBody as HeroCalendarGridBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarGridBody(props: Readonly<ComponentProps<typeof HeroCalendarGridBody>>) {
  return <HeroCalendarGridBody {...props} />
}

