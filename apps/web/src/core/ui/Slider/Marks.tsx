import { SliderMarks as HeroSliderMarks } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SliderMarks(props: Readonly<ComponentProps<typeof HeroSliderMarks>>) {
  return <HeroSliderMarks {...props} />
}

