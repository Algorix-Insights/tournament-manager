import { ModalDialog as HeroModalDialog } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalDialog(props: Readonly<ComponentProps<typeof HeroModalDialog>>) {
  return <HeroModalDialog {...props} />
}

