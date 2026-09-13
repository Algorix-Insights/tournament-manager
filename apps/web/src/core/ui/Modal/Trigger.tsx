import { ModalTrigger as HeroModalTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalTrigger(props: Readonly<ComponentProps<typeof HeroModalTrigger>>) {
  return <HeroModalTrigger {...props} />
}

