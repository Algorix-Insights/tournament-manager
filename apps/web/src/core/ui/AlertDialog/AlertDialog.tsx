import { AlertDialog as HeroAlertDialog } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/AlertDialog/Root'
import Trigger from '@/core/ui/AlertDialog/Trigger'
import Backdrop from '@/core/ui/AlertDialog/Backdrop'
import Container from '@/core/ui/AlertDialog/Container'
import Dialog from '@/core/ui/AlertDialog/Dialog'
import Header from '@/core/ui/AlertDialog/Header'
import Heading from '@/core/ui/AlertDialog/Heading'
import Body from '@/core/ui/AlertDialog/Body'
import Footer from '@/core/ui/AlertDialog/Footer'
import Icon from '@/core/ui/AlertDialog/Icon'
import CloseTrigger from '@/core/ui/AlertDialog/CloseTrigger'

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

