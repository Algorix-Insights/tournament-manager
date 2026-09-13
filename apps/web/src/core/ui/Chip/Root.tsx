import { ChipRoot as HeroChipRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ChipRoot(props: Readonly<ComponentProps<typeof HeroChipRoot>>) {
  return <HeroChipRoot {...props} />
}

