import { ColorSliderThumb as HeroColorSliderThumb } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSliderThumb(props: Readonly<ComponentProps<typeof HeroColorSliderThumb>>) {
  return <HeroColorSliderThumb {...props} />
}

