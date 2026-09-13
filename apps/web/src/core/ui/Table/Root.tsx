import { TableRoot as HeroTableRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableRoot(props: Readonly<ComponentProps<typeof HeroTableRoot>>) {
  return <HeroTableRoot {...props} />
}

