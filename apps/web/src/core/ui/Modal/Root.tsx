import { ModalRoot as HeroModalRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ModalRoot(props: Readonly<ComponentProps<typeof HeroModalRoot>>) {
  return <HeroModalRoot {...props} />
}

