import { SliderThumb as HeroSliderThumb } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderThumb(props: Readonly<ComponentProps<typeof HeroSliderThumb>>) {
  return <HeroSliderThumb {...props} />
}

