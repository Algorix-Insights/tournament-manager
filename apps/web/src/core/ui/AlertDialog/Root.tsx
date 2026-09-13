import { AlertDialogRoot as HeroAlertDialogRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogRoot(props: Readonly<ComponentProps<typeof HeroAlertDialogRoot>>) {
  return <HeroAlertDialogRoot {...props} />
}

