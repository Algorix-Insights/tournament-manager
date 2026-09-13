import { DrawerHeader as HeroDrawerHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerHeader(props: Readonly<ComponentProps<typeof HeroDrawerHeader>>) {
  return <HeroDrawerHeader {...props} />
}

