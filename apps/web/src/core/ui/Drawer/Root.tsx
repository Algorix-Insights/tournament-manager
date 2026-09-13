import { DrawerRoot as HeroDrawerRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerRoot(props: Readonly<ComponentProps<typeof HeroDrawerRoot>>) {
  return <HeroDrawerRoot {...props} />
}

