import { DrawerBackdrop as HeroDrawerBackdrop } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerBackdrop(props: Readonly<ComponentProps<typeof HeroDrawerBackdrop>>) {
  return <HeroDrawerBackdrop {...props} />
}

