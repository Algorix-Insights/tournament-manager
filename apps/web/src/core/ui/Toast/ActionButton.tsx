import { ToastActionButton as HeroToastActionButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ToastActionButton(props: Readonly<ComponentProps<typeof HeroToastActionButton>>) {
  return <HeroToastActionButton {...props} />
}

