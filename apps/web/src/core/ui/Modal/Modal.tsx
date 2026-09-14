import { Modal as HeroModal } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Modal/Root'
import Trigger from '@/core/ui/Modal/Trigger'
import Backdrop from '@/core/ui/Modal/Backdrop'
import Container from '@/core/ui/Modal/Container'
import Dialog from '@/core/ui/Modal/Dialog'
import Header from '@/core/ui/Modal/Header'
import Icon from '@/core/ui/Modal/Icon'
import Heading from '@/core/ui/Modal/Heading'
import Body from '@/core/ui/Modal/Body'
import Footer from '@/core/ui/Modal/Footer'
import CloseTrigger from '@/core/ui/Modal/CloseTrigger'

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

