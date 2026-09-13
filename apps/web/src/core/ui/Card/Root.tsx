import { CardRoot as HeroCardRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardRoot(props: Readonly<ComponentProps<typeof HeroCardRoot>>) {
  return <HeroCardRoot {...props} />
}

