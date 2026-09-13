import { RangeCalendarCell as HeroRangeCalendarCell } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RangeCalendarCell(props: Readonly<ComponentProps<typeof HeroRangeCalendarCell>>) {
  return <HeroRangeCalendarCell {...props} />
}

