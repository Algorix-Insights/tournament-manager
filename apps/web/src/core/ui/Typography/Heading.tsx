import { Heading as HeroHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Heading(props: Readonly<ComponentProps<typeof HeroHeading>>) {
  return <HeroHeading {...props} />
}

