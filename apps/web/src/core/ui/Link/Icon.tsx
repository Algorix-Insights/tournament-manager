import { LinkIcon as HeroLinkIcon } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function LinkIcon(props: Readonly<ComponentProps<typeof HeroLinkIcon>>) {
  return <HeroLinkIcon {...props} />
}

