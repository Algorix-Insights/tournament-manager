import { DrawerContent as HeroDrawerContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerContent(props: Readonly<ComponentProps<typeof HeroDrawerContent>>) {
  return <HeroDrawerContent {...props} />
}

