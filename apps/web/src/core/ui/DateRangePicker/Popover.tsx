import { DateRangePickerPopover as HeroDateRangePickerPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DateRangePickerPopover(props: Readonly<ComponentProps<typeof HeroDateRangePickerPopover>>) {
  return <HeroDateRangePickerPopover {...props} />
}

