import { ModalIcon as HeroModalIcon } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalIcon(props: Readonly<ComponentProps<typeof HeroModalIcon>>) {
  return <HeroModalIcon {...props} />
}

