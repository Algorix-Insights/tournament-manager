import { TooltipContent as HeroTooltipContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TooltipContent(props: Readonly<ComponentProps<typeof HeroTooltipContent>>) {
  return <HeroTooltipContent {...props} />
}

