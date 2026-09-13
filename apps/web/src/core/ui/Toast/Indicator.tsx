import { ToastIndicator as HeroToastIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastIndicator(props: Readonly<ComponentProps<typeof HeroToastIndicator>>) {
  return <HeroToastIndicator {...props} />
}

