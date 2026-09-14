import { Badge as HeroBadge } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Badge/Root'
import Label from '@/core/ui/Badge/Label'
import Anchor from '@/core/ui/Badge/Anchor'

function LocalBadge(props: Readonly<ComponentProps<typeof HeroBadge>>) {
  return <HeroBadge {...props} />
}

const Badge = Object.assign(LocalBadge, {
  Root: Root,
  Label: Label,
  Anchor: Anchor,
})

export default Badge

