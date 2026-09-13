import { DateRangePickerTrigger as HeroDateRangePickerTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DateRangePickerTrigger(props: Readonly<ComponentProps<typeof HeroDateRangePickerTrigger>>) {
  return <HeroDateRangePickerTrigger {...props} />
}

