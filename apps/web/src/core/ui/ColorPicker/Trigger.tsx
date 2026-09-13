import { ColorPickerTrigger as HeroColorPickerTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorPickerTrigger(props: Readonly<ComponentProps<typeof HeroColorPickerTrigger>>) {
  return <HeroColorPickerTrigger {...props} />
}

