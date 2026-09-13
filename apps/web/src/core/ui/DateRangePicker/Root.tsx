import { DateRangePickerRoot as HeroDateRangePickerRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DateRangePickerRoot(props: Readonly<ComponentProps<typeof HeroDateRangePickerRoot>>) {
  return <HeroDateRangePickerRoot {...props} />
}

