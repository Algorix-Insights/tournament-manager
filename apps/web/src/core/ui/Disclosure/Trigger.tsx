import { DisclosureTrigger as HeroDisclosureTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureTrigger(props: Readonly<ComponentProps<typeof HeroDisclosureTrigger>>) {
  return <HeroDisclosureTrigger {...props} />
}

