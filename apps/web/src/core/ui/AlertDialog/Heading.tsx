import { AlertDialogHeading as HeroAlertDialogHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogHeading(props: Readonly<ComponentProps<typeof HeroAlertDialogHeading>>) {
  return <HeroAlertDialogHeading {...props} />
}

