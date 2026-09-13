import { DrawerTrigger as HeroDrawerTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerTrigger(props: Readonly<ComponentProps<typeof HeroDrawerTrigger>>) {
  return <HeroDrawerTrigger {...props} />
}

