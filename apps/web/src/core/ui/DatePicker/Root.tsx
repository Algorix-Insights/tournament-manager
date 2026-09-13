import { DatePickerRoot as HeroDatePickerRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DatePickerRoot(props: Readonly<ComponentProps<typeof HeroDatePickerRoot>>) {
  return <HeroDatePickerRoot {...props} />
}

