import { CardContent as HeroCardContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardContent(props: Readonly<ComponentProps<typeof HeroCardContent>>) {
  return <HeroCardContent {...props} />
}

