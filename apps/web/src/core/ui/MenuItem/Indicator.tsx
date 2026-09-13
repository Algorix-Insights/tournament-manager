import { MenuItemIndicator as HeroMenuItemIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MenuItemIndicator(props: Readonly<ComponentProps<typeof HeroMenuItemIndicator>>) {
  return <HeroMenuItemIndicator {...props} />
}

