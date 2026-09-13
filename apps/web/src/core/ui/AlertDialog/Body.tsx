import { AlertDialogBody as HeroAlertDialogBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogBody(props: Readonly<ComponentProps<typeof HeroAlertDialogBody>>) {
  return <HeroAlertDialogBody {...props} />
}

