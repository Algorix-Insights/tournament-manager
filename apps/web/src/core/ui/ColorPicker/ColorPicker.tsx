import { ColorPicker as HeroColorPicker } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Popover from './Popover'

function LocalColorPicker(props: Readonly<ComponentProps<typeof HeroColorPicker>>) {
  return <HeroColorPicker {...props} />
}

const ColorPicker = Object.assign(LocalColorPicker, {
  Root: Root,
  Trigger: Trigger,
  Popover: Popover,
})

export default ColorPicker

