import { DropdownMenu as HeroDropdownMenu } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownMenu(props: Readonly<ComponentProps<typeof HeroDropdownMenu>>) {
  return <HeroDropdownMenu {...props} />
}

