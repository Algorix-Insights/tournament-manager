import { ModalBackdrop as HeroModalBackdrop } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalBackdrop(props: Readonly<ComponentProps<typeof HeroModalBackdrop>>) {
  return <HeroModalBackdrop {...props} />
}

