import { BadgeAnchor as HeroBadgeAnchor } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function BadgeAnchor(props: Readonly<ComponentProps<typeof HeroBadgeAnchor>>) {
  return <HeroBadgeAnchor {...props} />
}

