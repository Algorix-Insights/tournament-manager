import { AlertDialogTrigger as HeroAlertDialogTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogTrigger(props: Readonly<ComponentProps<typeof HeroAlertDialogTrigger>>) {
  return <HeroAlertDialogTrigger {...props} />
}

