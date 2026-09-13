import { ColorSlider as HeroColorSlider } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Output from './Output'
import Track from './Track'
import Thumb from './Thumb'

function LocalColorSlider(props: Readonly<ComponentProps<typeof HeroColorSlider>>) {
  return <HeroColorSlider {...props} />
}

const ColorSlider = Object.assign(LocalColorSlider, {
  Root: Root,
  Output: Output,
  Track: Track,
  Thumb: Thumb,
})

export default ColorSlider

