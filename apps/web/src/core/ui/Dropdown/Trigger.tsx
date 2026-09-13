import { DropdownTrigger as HeroDropdownTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownTrigger(props: Readonly<ComponentProps<typeof HeroDropdownTrigger>>) {
  return <HeroDropdownTrigger {...props} />
}

