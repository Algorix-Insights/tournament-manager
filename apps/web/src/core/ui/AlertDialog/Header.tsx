import { AlertDialogHeader as HeroAlertDialogHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogHeader(props: Readonly<ComponentProps<typeof HeroAlertDialogHeader>>) {
  return <HeroAlertDialogHeader {...props} />
}

