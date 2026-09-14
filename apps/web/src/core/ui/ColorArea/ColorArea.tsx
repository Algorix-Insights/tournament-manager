import { ColorArea as HeroColorArea } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ColorArea/Root'
import Thumb from '@/core/ui/ColorArea/Thumb'

function LocalColorArea(props: Readonly<ComponentProps<typeof HeroColorArea>>) {
  return <HeroColorArea {...props} />
}

const ColorArea = Object.assign(LocalColorArea, {
  Root: Root,
  Thumb: Thumb,
})

export default ColorArea

