import { Tooltip as HeroTooltip } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Tooltip/Root'
import Trigger from '@/core/ui/Tooltip/Trigger'
import Content from '@/core/ui/Tooltip/Content'
import Arrow from '@/core/ui/Tooltip/Arrow'

function LocalTooltip(props: Readonly<ComponentProps<typeof HeroTooltip>>) {
  return <HeroTooltip {...props} />
}

const Tooltip = Object.assign(LocalTooltip, {
  Root: Root,
  Trigger: Trigger,
  Content: Content,
  Arrow: Arrow,
})

export default Tooltip

