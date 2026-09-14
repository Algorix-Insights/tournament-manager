import { Slider as HeroSlider } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Slider/Root'
import Output from '@/core/ui/Slider/Output'
import Track from '@/core/ui/Slider/Track'
import Fill from '@/core/ui/Slider/Fill'
import Thumb from '@/core/ui/Slider/Thumb'
import Marks from '@/core/ui/Slider/Marks'

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

