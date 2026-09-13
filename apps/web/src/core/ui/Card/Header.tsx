import { CardHeader as HeroCardHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardHeader(props: Readonly<ComponentProps<typeof HeroCardHeader>>) {
  return <HeroCardHeader {...props} />
}

