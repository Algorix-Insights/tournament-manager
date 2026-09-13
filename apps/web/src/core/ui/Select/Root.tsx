import { SelectRoot as HeroSelectRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectRoot(props: Readonly<ComponentProps<typeof HeroSelectRoot>>) {
  return <HeroSelectRoot {...props} />
}

