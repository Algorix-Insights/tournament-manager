import { AlertDialogContainer as HeroAlertDialogContainer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDialogContainer(props: Readonly<ComponentProps<typeof HeroAlertDialogContainer>>) {
  return <HeroAlertDialogContainer {...props} />
}

