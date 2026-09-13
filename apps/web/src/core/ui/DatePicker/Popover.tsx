import { DatePickerPopover as HeroDatePickerPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DatePickerPopover(props: Readonly<ComponentProps<typeof HeroDatePickerPopover>>) {
  return <HeroDatePickerPopover {...props} />
}

