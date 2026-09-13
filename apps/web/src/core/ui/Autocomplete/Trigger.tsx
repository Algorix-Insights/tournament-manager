import { AutocompleteTrigger as HeroAutocompleteTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompleteTrigger(props: Readonly<ComponentProps<typeof HeroAutocompleteTrigger>>) {
  return <HeroAutocompleteTrigger {...props} />
}

