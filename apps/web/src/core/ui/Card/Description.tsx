import { CardDescription as HeroCardDescription } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardDescription(props: Readonly<ComponentProps<typeof HeroCardDescription>>) {
  return <HeroCardDescription {...props} />
}

