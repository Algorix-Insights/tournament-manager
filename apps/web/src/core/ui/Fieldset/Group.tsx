import { FieldGroup as HeroFieldGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function FieldGroup(props: Readonly<ComponentProps<typeof HeroFieldGroup>>) {
  return <HeroFieldGroup {...props} />
}

