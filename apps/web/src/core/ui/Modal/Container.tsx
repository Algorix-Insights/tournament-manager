import { ModalContainer as HeroModalContainer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalContainer(props: Readonly<ComponentProps<typeof HeroModalContainer>>) {
  return <HeroModalContainer {...props} />
}

