import { DrawerHeading as HeroDrawerHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerHeading(props: Readonly<ComponentProps<typeof HeroDrawerHeading>>) {
  return <HeroDrawerHeading {...props} />
}

