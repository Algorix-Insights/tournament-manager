import { RangeCalendarGrid as HeroRangeCalendarGrid } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RangeCalendarGrid(props: Readonly<ComponentProps<typeof HeroRangeCalendarGrid>>) {
  return <HeroRangeCalendarGrid {...props} />
}

