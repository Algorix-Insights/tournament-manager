import { ColorSwatchPicker as HeroColorSwatchPicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ColorSwatchPicker/Root'
import Item from '@/core/ui/ColorSwatchPicker/Item'
import Swatch from '@/core/ui/ColorSwatchPicker/Swatch'
import Indicator from '@/core/ui/ColorSwatchPicker/Indicator'

function LocalColorSwatchPicker(props: Readonly<ComponentProps<typeof HeroColorSwatchPicker>>) {
  return <HeroColorSwatchPicker {...props} />
}

const ColorSwatchPicker = Object.assign(LocalColorSwatchPicker, {
  Root: Root,
  Item: Item,
  Swatch: Swatch,
  Indicator: Indicator,
})

export default ColorSwatchPicker

