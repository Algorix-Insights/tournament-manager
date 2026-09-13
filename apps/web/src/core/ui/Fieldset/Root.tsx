import { FieldsetRoot as HeroFieldsetRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function FieldsetRoot(props: Readonly<ComponentProps<typeof HeroFieldsetRoot>>) {
  return <HeroFieldsetRoot {...props} />
}

