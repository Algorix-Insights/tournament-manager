import { KbdAbbr as HeroKbdAbbr } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function KbdAbbr(props: Readonly<ComponentProps<typeof HeroKbdAbbr>>) {
  return <HeroKbdAbbr {...props} />
}

