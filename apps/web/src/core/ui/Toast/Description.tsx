import { ToastDescription as HeroToastDescription } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastDescription(props: Readonly<ComponentProps<typeof HeroToastDescription>>) {
  return <HeroToastDescription {...props} />
}

