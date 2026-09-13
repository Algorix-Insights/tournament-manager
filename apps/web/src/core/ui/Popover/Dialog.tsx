import { PopoverDialog as HeroPopoverDialog } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverDialog(props: Readonly<ComponentProps<typeof HeroPopoverDialog>>) {
  return <HeroPopoverDialog {...props} />
}

