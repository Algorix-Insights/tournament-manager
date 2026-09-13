import { DropdownPopover as HeroDropdownPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownPopover(props: Readonly<ComponentProps<typeof HeroDropdownPopover>>) {
  return <HeroDropdownPopover {...props} />
}

