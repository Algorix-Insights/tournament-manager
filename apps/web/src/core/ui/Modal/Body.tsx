import { ModalBody as HeroModalBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalBody(props: Readonly<ComponentProps<typeof HeroModalBody>>) {
  return <HeroModalBody {...props} />
}

