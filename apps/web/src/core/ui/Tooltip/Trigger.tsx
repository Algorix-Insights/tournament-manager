import { TooltipTrigger as HeroTooltipTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TooltipTrigger(props: Readonly<ComponentProps<typeof HeroTooltipTrigger>>) {
  return <HeroTooltipTrigger {...props} />
}

