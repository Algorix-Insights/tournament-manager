import { DrawerFooter as HeroDrawerFooter } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerFooter(props: Readonly<ComponentProps<typeof HeroDrawerFooter>>) {
  return <HeroDrawerFooter {...props} />
}

