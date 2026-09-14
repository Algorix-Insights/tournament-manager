import { DateRangePicker as HeroDateRangePicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/DateRangePicker/Root'
import Trigger from '@/core/ui/DateRangePicker/Trigger'
import TriggerIndicator from '@/core/ui/DateRangePicker/TriggerIndicator'
import RangeSeparator from '@/core/ui/DateRangePicker/RangeSeparator'
import Popover from '@/core/ui/DateRangePicker/Popover'

function LocalDateRangePicker(props: Readonly<ComponentProps<typeof HeroDateRangePicker>>) {
  return <HeroDateRangePicker {...props} />
}

const DateRangePicker = Object.assign(LocalDateRangePicker, {
  Root: Root,
  Trigger: Trigger,
  TriggerIndicator: TriggerIndicator,
  RangeSeparator: RangeSeparator,
  Popover: Popover,
})

export default DateRangePicker

