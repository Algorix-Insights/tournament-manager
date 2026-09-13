import { DatePicker as HeroDatePicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import TriggerIndicator from './TriggerIndicator'
import Popover from './Popover'

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

