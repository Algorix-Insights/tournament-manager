import { Drawer as HeroDrawer } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Drawer/Root'
import Trigger from '@/core/ui/Drawer/Trigger'
import Backdrop from '@/core/ui/Drawer/Backdrop'
import Content from '@/core/ui/Drawer/Content'
import Dialog from '@/core/ui/Drawer/Dialog'
import Header from '@/core/ui/Drawer/Header'
import Heading from '@/core/ui/Drawer/Heading'
import Body from '@/core/ui/Drawer/Body'
import Footer from '@/core/ui/Drawer/Footer'
import Handle from '@/core/ui/Drawer/Handle'
import CloseTrigger from '@/core/ui/Drawer/CloseTrigger'

function LocalDrawer(props: Readonly<ComponentProps<typeof HeroDrawer>>) {
  return <HeroDrawer {...props} />
}

const Drawer = Object.assign(LocalDrawer, {
  Root: Root,
  Trigger: Trigger,
  Backdrop: Backdrop,
  Content: Content,
  Dialog: Dialog,
  Header: Header,
  Heading: Heading,
  Body: Body,
  Footer: Footer,
  Handle: Handle,
  CloseTrigger: CloseTrigger,
})

export default Drawer

