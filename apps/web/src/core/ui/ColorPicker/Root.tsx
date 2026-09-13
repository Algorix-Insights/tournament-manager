import { ColorPickerRoot as HeroColorPickerRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorPickerRoot(props: Readonly<ComponentProps<typeof HeroColorPickerRoot>>) {
  return <HeroColorPickerRoot {...props} />
}

