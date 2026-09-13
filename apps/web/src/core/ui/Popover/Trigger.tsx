import { PopoverTrigger as HeroPopoverTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverTrigger(props: Readonly<ComponentProps<typeof HeroPopoverTrigger>>) {
  return <HeroPopoverTrigger {...props} />
}

