import { PopoverRoot as HeroPopoverRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverRoot(props: Readonly<ComponentProps<typeof HeroPopoverRoot>>) {
  return <HeroPopoverRoot {...props} />
}

