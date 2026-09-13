import { KbdRoot as HeroKbdRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function KbdRoot(props: Readonly<ComponentProps<typeof HeroKbdRoot>>) {
  return <HeroKbdRoot {...props} />
}

