import { ButtonGroupRoot as HeroButtonGroupRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ButtonGroupRoot(props: Readonly<ComponentProps<typeof HeroButtonGroupRoot>>) {
  return <HeroButtonGroupRoot {...props} />
}

