import { DrawerBody as HeroDrawerBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerBody(props: Readonly<ComponentProps<typeof HeroDrawerBody>>) {
  return <HeroDrawerBody {...props} />
}

