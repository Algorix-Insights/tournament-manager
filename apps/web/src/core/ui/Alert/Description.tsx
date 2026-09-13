import { AlertDescription as HeroAlertDescription } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertDescription(props: Readonly<ComponentProps<typeof HeroAlertDescription>>) {
  return <HeroAlertDescription {...props} />
}

