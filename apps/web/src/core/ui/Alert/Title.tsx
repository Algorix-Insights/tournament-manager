import { AlertTitle as HeroAlertTitle } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertTitle(props: Readonly<ComponentProps<typeof HeroAlertTitle>>) {
  return <HeroAlertTitle {...props} />
}

