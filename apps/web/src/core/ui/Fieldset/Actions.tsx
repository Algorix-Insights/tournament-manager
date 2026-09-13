import { FieldsetActions as HeroFieldsetActions } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function FieldsetActions(props: Readonly<ComponentProps<typeof HeroFieldsetActions>>) {
  return <HeroFieldsetActions {...props} />
}

