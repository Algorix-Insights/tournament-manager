import { DisclosureRoot as HeroDisclosureRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureRoot(props: Readonly<ComponentProps<typeof HeroDisclosureRoot>>) {
  return <HeroDisclosureRoot {...props} />
}

