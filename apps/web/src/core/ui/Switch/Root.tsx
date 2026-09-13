import { SwitchRoot as HeroSwitchRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SwitchRoot(props: Readonly<ComponentProps<typeof HeroSwitchRoot>>) {
  return <HeroSwitchRoot {...props} />
}

