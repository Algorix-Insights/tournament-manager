import { AlertContent as HeroAlertContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AlertContent(props: Readonly<ComponentProps<typeof HeroAlertContent>>) {
  return <HeroAlertContent {...props} />
}

