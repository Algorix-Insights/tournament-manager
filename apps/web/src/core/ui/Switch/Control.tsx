import { SwitchControl as HeroSwitchControl } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SwitchControl(props: Readonly<ComponentProps<typeof HeroSwitchControl>>) {
  return <HeroSwitchControl {...props} />
}

