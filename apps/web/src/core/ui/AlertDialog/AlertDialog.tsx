import { AlertDialog as HeroAlertDialog } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Backdrop from './Backdrop'
import Container from './Container'
import Dialog from './Dialog'
import Header from './Header'
import Heading from './Heading'
import Body from './Body'
import Footer from './Footer'
import Icon from './Icon'
import CloseTrigger from './CloseTrigger'

function LocalAlertDialog(props: Readonly<ComponentProps<typeof HeroAlertDialog>>) {
  return <HeroAlertDialog {...props} />
}

const AlertDialog = Object.assign(LocalAlertDialog, {
  Root: Root,
  Trigger: Trigger,
  Backdrop: Backdrop,
  Container: Container,
  Dialog: Dialog,
  Header: Header,
  Heading: Heading,
  Body: Body,
  Footer: Footer,
  Icon: Icon,
  CloseTrigger: CloseTrigger,
})

export default AlertDialog

