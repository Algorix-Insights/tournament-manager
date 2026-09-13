import { DrawerHandle as HeroDrawerHandle } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerHandle(props: Readonly<ComponentProps<typeof HeroDrawerHandle>>) {
  return <HeroDrawerHandle {...props} />
}

