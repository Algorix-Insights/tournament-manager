import { Tooltip as HeroTooltip } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Content from './Content'
import Arrow from './Arrow'

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

