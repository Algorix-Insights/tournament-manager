import { AlertDialogDialog as HeroAlertDialogDialog } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogDialog(props: Readonly<ComponentProps<typeof HeroAlertDialogDialog>>) {
  return <HeroAlertDialogDialog {...props} />
}

