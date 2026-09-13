import { CalendarYearPickerCell as HeroCalendarYearPickerCell } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CalendarYearPickerCell(props: Readonly<ComponentProps<typeof HeroCalendarYearPickerCell>>) {
  return <HeroCalendarYearPickerCell {...props} />
}

