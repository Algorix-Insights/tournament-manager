import { SliderRoot as HeroSliderRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderRoot(props: Readonly<ComponentProps<typeof HeroSliderRoot>>) {
  return <HeroSliderRoot {...props} />
}

