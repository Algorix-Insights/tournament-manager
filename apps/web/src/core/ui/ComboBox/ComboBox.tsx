import { ComboBox as HeroComboBox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ComboBox/Root'
import InputGroup from '@/core/ui/ComboBox/InputGroup'
import Popover from '@/core/ui/ComboBox/Popover'
import Trigger from '@/core/ui/ComboBox/Trigger'
import Value from '@/core/ui/ComboBox/Value'

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

