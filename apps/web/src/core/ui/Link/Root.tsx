import { LinkRoot as HeroLinkRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function LinkRoot(props: Readonly<ComponentProps<typeof HeroLinkRoot>>) {
  return <HeroLinkRoot {...props} />
}

