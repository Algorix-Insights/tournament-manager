import { SelectPopover as HeroSelectPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectPopover(props: Readonly<ComponentProps<typeof HeroSelectPopover>>) {
  return <HeroSelectPopover {...props} />
}

