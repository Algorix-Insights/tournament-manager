import { ColorSliderOutput as HeroColorSliderOutput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSliderOutput(props: Readonly<ComponentProps<typeof HeroColorSliderOutput>>) {
  return <HeroColorSliderOutput {...props} />
}

