import { Popover as HeroPopover } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Arrow from './Arrow'
import Content from './Content'
import Dialog from './Dialog'
import Heading from './Heading'

function LocalPopover(props: Readonly<ComponentProps<typeof HeroPopover>>) {
  return <HeroPopover {...props} />
}

const Popover = Object.assign(LocalPopover, {
  Root: Root,
  Trigger: Trigger,
  Arrow: Arrow,
  Content: Content,
  Dialog: Dialog,
  Heading: Heading,
})

export default Popover

