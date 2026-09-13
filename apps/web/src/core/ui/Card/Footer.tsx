import { CardFooter as HeroCardFooter } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CardFooter(props: Readonly<ComponentProps<typeof HeroCardFooter>>) {
  return <HeroCardFooter {...props} />
}

