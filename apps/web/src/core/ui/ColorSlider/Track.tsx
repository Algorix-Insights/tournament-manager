import { ColorSliderTrack as HeroColorSliderTrack } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSliderTrack(props: Readonly<ComponentProps<typeof HeroColorSliderTrack>>) {
  return <HeroColorSliderTrack {...props} />
}

