import { ColorSwatchPicker as HeroColorSwatchPicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Item from './Item'
import Swatch from './Swatch'
import Indicator from './Indicator'

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

