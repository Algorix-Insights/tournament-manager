import { DatePicker as HeroDatePicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/DatePicker/Root'
import Trigger from '@/core/ui/DatePicker/Trigger'
import TriggerIndicator from '@/core/ui/DatePicker/TriggerIndicator'
import Popover from '@/core/ui/DatePicker/Popover'

function LocalDatePicker(props: Readonly<ComponentProps<typeof HeroDatePicker>>) {
  return <HeroDatePicker {...props} />
}

const DatePicker = Object.assign(LocalDatePicker, {
  Root: Root,
  Trigger: Trigger,
  TriggerIndicator: TriggerIndicator,
  Popover: Popover,
})

export default DatePicker

