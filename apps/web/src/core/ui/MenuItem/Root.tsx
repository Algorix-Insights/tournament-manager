import { MenuItemRoot as HeroMenuItemRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MenuItemRoot(props: Readonly<ComponentProps<typeof HeroMenuItemRoot>>) {
  return <HeroMenuItemRoot {...props} />
}

