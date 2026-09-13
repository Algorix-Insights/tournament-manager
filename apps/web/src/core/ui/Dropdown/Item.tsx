import { DropdownItem as HeroDropdownItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownItem(props: Readonly<ComponentProps<typeof HeroDropdownItem>>) {
  return <HeroDropdownItem {...props} />
}

