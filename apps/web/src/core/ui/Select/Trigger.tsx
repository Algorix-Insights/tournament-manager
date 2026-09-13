import { SelectTrigger as HeroSelectTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectTrigger(props: Readonly<ComponentProps<typeof HeroSelectTrigger>>) {
  return <HeroSelectTrigger {...props} />
}

