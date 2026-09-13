import { NumberFieldGroup as HeroNumberFieldGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function NumberFieldGroup(props: Readonly<ComponentProps<typeof HeroNumberFieldGroup>>) {
  return <HeroNumberFieldGroup {...props} />
}

