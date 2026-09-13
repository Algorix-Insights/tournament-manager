import { TagRemoveButton as HeroTagRemoveButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TagRemoveButton(props: Readonly<ComponentProps<typeof HeroTagRemoveButton>>) {
  return <HeroTagRemoveButton {...props} />
}

