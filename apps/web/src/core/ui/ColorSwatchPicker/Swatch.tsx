import { ColorSwatchPickerSwatch as HeroColorSwatchPickerSwatch } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSwatchPickerSwatch(props: Readonly<ComponentProps<typeof HeroColorSwatchPickerSwatch>>) {
  return <HeroColorSwatchPickerSwatch {...props} />
}

