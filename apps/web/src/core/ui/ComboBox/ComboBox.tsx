import { ComboBox as HeroComboBox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import InputGroup from './InputGroup'
import Popover from './Popover'
import Trigger from './Trigger'
import Value from './Value'

function LocalComboBox(props: Readonly<ComponentProps<typeof HeroComboBox>>) {
  return <HeroComboBox {...props} />
}

const ComboBox = Object.assign(LocalComboBox, {
  Root: Root,
  InputGroup: InputGroup,
  Popover: Popover,
  Trigger: Trigger,
  Value: Value,
})

export default ComboBox

