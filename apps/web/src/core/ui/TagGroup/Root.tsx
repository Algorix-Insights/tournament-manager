import { TagGroupRoot as HeroTagGroupRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TagGroupRoot(props: Readonly<ComponentProps<typeof HeroTagGroupRoot>>) {
  return <HeroTagGroupRoot {...props} />
}

