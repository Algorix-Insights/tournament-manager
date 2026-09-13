import { DateRangePicker as HeroDateRangePicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import TriggerIndicator from './TriggerIndicator'
import RangeSeparator from './RangeSeparator'
import Popover from './Popover'

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

