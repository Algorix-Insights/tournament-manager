import { ToastProvider as HeroToastProvider } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastProvider(props: Readonly<ComponentProps<typeof HeroToastProvider>>) {
  return <HeroToastProvider {...props} />
}

