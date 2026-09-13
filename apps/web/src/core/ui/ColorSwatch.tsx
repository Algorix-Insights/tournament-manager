import { ColorSwatch as HeroColorSwatch } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalColorSwatch(props: Readonly<ComponentProps<typeof HeroColorSwatch>>) {
  return <HeroColorSwatch {...props} />
}

const ColorSwatch = Object.assign(LocalColorSwatch, {
  Root: LocalColorSwatch,
})

export default ColorSwatch

