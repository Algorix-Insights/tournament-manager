import { ToastCloseButton as HeroToastCloseButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastCloseButton(props: Readonly<ComponentProps<typeof HeroToastCloseButton>>) {
  return <HeroToastCloseButton {...props} />
}

