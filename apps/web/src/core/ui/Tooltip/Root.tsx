import { TooltipRoot as HeroTooltipRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TooltipRoot(props: Readonly<ComponentProps<typeof HeroTooltipRoot>>) {
  return <HeroTooltipRoot {...props} />
}

