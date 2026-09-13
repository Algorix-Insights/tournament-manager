import { KbdContent as HeroKbdContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function KbdContent(props: Readonly<ComponentProps<typeof HeroKbdContent>>) {
  return <HeroKbdContent {...props} />
}

