import { BadgeLabel as HeroBadgeLabel } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function BadgeLabel(props: Readonly<ComponentProps<typeof HeroBadgeLabel>>) {
  return <HeroBadgeLabel {...props} />
}

