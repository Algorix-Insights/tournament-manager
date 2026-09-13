import { ToastTitle as HeroToastTitle } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastTitle(props: Readonly<ComponentProps<typeof HeroToastTitle>>) {
  return <HeroToastTitle {...props} />
}

