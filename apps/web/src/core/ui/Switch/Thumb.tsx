import { SwitchThumb as HeroSwitchThumb } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SwitchThumb(props: Readonly<ComponentProps<typeof HeroSwitchThumb>>) {
  return <HeroSwitchThumb {...props} />
}

