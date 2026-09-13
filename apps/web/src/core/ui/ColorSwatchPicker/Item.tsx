import { ColorSwatchPickerItem as HeroColorSwatchPickerItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSwatchPickerItem(props: Readonly<ComponentProps<typeof HeroColorSwatchPickerItem>>) {
  return <HeroColorSwatchPickerItem {...props} />
}

