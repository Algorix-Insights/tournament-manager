import { InputGroupRoot as HeroInputGroupRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function InputGroupRoot(props: Readonly<ComponentProps<typeof HeroInputGroupRoot>>) {
  return <HeroInputGroupRoot {...props} />
}

