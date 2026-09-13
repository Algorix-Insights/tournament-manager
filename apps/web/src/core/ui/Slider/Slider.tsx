import { Slider as HeroSlider } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Output from './Output'
import Track from './Track'
import Fill from './Fill'
import Thumb from './Thumb'
import Marks from './Marks'

function LocalSlider(props: Readonly<ComponentProps<typeof HeroSlider>>) {
  return <HeroSlider {...props} />
}

const Slider = Object.assign(LocalSlider, {
  Root: Root,
  Output: Output,
  Track: Track,
  Fill: Fill,
  Thumb: Thumb,
  Marks: Marks,
})

export default Slider

