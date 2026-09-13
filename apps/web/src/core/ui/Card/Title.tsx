import { CardTitle as HeroCardTitle } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardTitle(props: Readonly<ComponentProps<typeof HeroCardTitle>>) {
  return <HeroCardTitle {...props} />
}

