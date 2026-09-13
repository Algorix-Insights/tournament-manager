import { Modal as HeroModal } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Backdrop from './Backdrop'
import Container from './Container'
import Dialog from './Dialog'
import Header from './Header'
import Icon from './Icon'
import Heading from './Heading'
import Body from './Body'
import Footer from './Footer'
import CloseTrigger from './CloseTrigger'

function LocalModal(props: Readonly<ComponentProps<typeof HeroModal>>) {
  return <HeroModal {...props} />
}

const Modal = Object.assign(LocalModal, {
  Root: Root,
  Trigger: Trigger,
  Backdrop: Backdrop,
  Container: Container,
  Dialog: Dialog,
  Header: Header,
  Icon: Icon,
  Heading: Heading,
  Body: Body,
  Footer: Footer,
  CloseTrigger: CloseTrigger,
})

export default Modal

