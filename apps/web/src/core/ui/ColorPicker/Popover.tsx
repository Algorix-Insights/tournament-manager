import { ColorPickerPopover as HeroColorPickerPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorPickerPopover(props: Readonly<ComponentProps<typeof HeroColorPickerPopover>>) {
  return <HeroColorPickerPopover {...props} />
}

