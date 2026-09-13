import { Drawer as HeroDrawer } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Backdrop from './Backdrop'
import Content from './Content'
import Dialog from './Dialog'
import Header from './Header'
import Heading from './Heading'
import Body from './Body'
import Footer from './Footer'
import Handle from './Handle'
import CloseTrigger from './CloseTrigger'

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

