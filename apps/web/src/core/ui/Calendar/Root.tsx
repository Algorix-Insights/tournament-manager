import { CalendarRoot as HeroCalendarRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarRoot(props: Readonly<ComponentProps<typeof HeroCalendarRoot>>) {
  return <HeroCalendarRoot {...props} />
}

