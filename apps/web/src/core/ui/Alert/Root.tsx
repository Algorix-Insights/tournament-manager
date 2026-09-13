import { AlertRoot as HeroAlertRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertRoot(props: Readonly<ComponentProps<typeof HeroAlertRoot>>) {
  return <HeroAlertRoot {...props} />
}

