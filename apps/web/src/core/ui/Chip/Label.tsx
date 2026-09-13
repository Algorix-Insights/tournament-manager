import { ChipLabel as HeroChipLabel } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ChipLabel(props: Readonly<ComponentProps<typeof HeroChipLabel>>) {
  return <HeroChipLabel {...props} />
}

