import { Badge as HeroBadge } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Label from './Label'
import Anchor from './Anchor'

function LocalBadge(props: Readonly<ComponentProps<typeof HeroBadge>>) {
  return <HeroBadge {...props} />
}

const Badge = Object.assign(LocalBadge, {
  Root: Root,
  Label: Label,
  Anchor: Anchor,
})

export default Badge

