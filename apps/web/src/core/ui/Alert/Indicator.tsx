import { AlertIndicator as HeroAlertIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertIndicator(props: Readonly<ComponentProps<typeof HeroAlertIndicator>>) {
  return <HeroAlertIndicator {...props} />
}

