import { SwitchContent as HeroSwitchContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SwitchContent(props: Readonly<ComponentProps<typeof HeroSwitchContent>>) {
  return <HeroSwitchContent {...props} />
}

