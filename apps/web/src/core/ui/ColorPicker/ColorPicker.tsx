import { ColorPicker as HeroColorPicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ColorPicker/Root'
import Trigger from '@/core/ui/ColorPicker/Trigger'
import Popover from '@/core/ui/ColorPicker/Popover'

function LocalColorPicker(props: Readonly<ComponentProps<typeof HeroColorPicker>>) {
  return <HeroColorPicker {...props} />
}

const ColorPicker = Object.assign(LocalColorPicker, {
  Root: Root,
  Trigger: Trigger,
  Popover: Popover,
})

export default ColorPicker

