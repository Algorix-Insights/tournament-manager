import { ColorSwatchPickerRoot as HeroColorSwatchPickerRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSwatchPickerRoot(props: Readonly<ComponentProps<typeof HeroColorSwatchPickerRoot>>) {
  return <HeroColorSwatchPickerRoot {...props} />
}

