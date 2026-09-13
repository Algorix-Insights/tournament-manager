import { SliderTrack as HeroSliderTrack } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderTrack(props: Readonly<ComponentProps<typeof HeroSliderTrack>>) {
  return <HeroSliderTrack {...props} />
}

