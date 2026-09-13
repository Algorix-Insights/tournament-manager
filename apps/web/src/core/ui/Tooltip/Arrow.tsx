import { TooltipArrow as HeroTooltipArrow } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TooltipArrow(props: Readonly<ComponentProps<typeof HeroTooltipArrow>>) {
  return <HeroTooltipArrow {...props} />
}

