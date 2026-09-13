import { ModalHeader as HeroModalHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalHeader(props: Readonly<ComponentProps<typeof HeroModalHeader>>) {
  return <HeroModalHeader {...props} />
}

