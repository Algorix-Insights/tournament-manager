import { PopoverContent as HeroPopoverContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverContent(props: Readonly<ComponentProps<typeof HeroPopoverContent>>) {
  return <HeroPopoverContent {...props} />
}

