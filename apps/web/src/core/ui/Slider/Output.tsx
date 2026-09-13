import { SliderOutput as HeroSliderOutput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderOutput(props: Readonly<ComponentProps<typeof HeroSliderOutput>>) {
  return <HeroSliderOutput {...props} />
}

