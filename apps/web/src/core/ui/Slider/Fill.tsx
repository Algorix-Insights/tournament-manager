import { SliderFill as HeroSliderFill } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderFill(props: Readonly<ComponentProps<typeof HeroSliderFill>>) {
  return <HeroSliderFill {...props} />
}

