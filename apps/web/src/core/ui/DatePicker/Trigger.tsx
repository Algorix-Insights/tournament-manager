import { DatePickerTrigger as HeroDatePickerTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DatePickerTrigger(props: Readonly<ComponentProps<typeof HeroDatePickerTrigger>>) {
  return <HeroDatePickerTrigger {...props} />
}

