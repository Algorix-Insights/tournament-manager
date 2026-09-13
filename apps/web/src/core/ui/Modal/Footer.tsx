import { ModalFooter as HeroModalFooter } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalFooter(props: Readonly<ComponentProps<typeof HeroModalFooter>>) {
  return <HeroModalFooter {...props} />
}

