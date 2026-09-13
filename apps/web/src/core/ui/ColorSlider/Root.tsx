import { ColorSliderRoot as HeroColorSliderRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorSliderRoot(props: Readonly<ComponentProps<typeof HeroColorSliderRoot>>) {
  return <HeroColorSliderRoot {...props} />
}

