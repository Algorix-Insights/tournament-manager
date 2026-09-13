import { ModalHeading as HeroModalHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalHeading(props: Readonly<ComponentProps<typeof HeroModalHeading>>) {
  return <HeroModalHeading {...props} />
}

