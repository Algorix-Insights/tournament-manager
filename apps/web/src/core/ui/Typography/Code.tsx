import { Code as HeroCode } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Code(props: Readonly<ComponentProps<typeof HeroCode>>) {
  return <HeroCode {...props} />
}

