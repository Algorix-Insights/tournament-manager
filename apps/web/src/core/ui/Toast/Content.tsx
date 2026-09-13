import { ToastContent as HeroToastContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastContent(props: Readonly<ComponentProps<typeof HeroToastContent>>) {
  return <HeroToastContent {...props} />
}

