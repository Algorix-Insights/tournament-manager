import { TagRoot as HeroTagRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TagRoot(props: Readonly<ComponentProps<typeof HeroTagRoot>>) {
  return <HeroTagRoot {...props} />
}

