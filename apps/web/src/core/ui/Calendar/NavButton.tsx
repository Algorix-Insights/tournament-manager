import { CalendarNavButton as HeroCalendarNavButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarNavButton(props: Readonly<ComponentProps<typeof HeroCalendarNavButton>>) {
  return <HeroCalendarNavButton {...props} />
}

