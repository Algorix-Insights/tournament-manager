import { Popover as HeroPopover } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Popover/Root'
import Trigger from '@/core/ui/Popover/Trigger'
import Arrow from '@/core/ui/Popover/Arrow'
import Content from '@/core/ui/Popover/Content'
import Dialog from '@/core/ui/Popover/Dialog'
import Heading from '@/core/ui/Popover/Heading'

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

