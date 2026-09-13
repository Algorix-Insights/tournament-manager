import { BadgeRoot as HeroBadgeRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function BadgeRoot(props: Readonly<ComponentProps<typeof HeroBadgeRoot>>) {
  return <HeroBadgeRoot {...props} />
}

