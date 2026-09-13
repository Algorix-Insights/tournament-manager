import { DropdownRoot as HeroDropdownRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownRoot(props: Readonly<ComponentProps<typeof HeroDropdownRoot>>) {
  return <HeroDropdownRoot {...props} />
}

