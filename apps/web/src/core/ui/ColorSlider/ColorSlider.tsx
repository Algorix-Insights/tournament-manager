import { ColorSlider as HeroColorSlider } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ColorSlider/Root'
import Output from '@/core/ui/ColorSlider/Output'
import Track from '@/core/ui/ColorSlider/Track'
import Thumb from '@/core/ui/ColorSlider/Thumb'

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

