import { PopoverHeading as HeroPopoverHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PopoverHeading(props: Readonly<ComponentProps<typeof HeroPopoverHeading>>) {
  return <HeroPopoverHeading {...props} />
}

