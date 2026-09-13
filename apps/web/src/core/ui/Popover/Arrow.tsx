import { PopoverArrow as HeroPopoverArrow } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverArrow(props: Readonly<ComponentProps<typeof HeroPopoverArrow>>) {
  return <HeroPopoverArrow {...props} />
}

