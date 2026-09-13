import { Select as HeroSelect } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Value from './Value'
import Indicator from './Indicator'
import ClearButton from './ClearButton'
import Popover from './Popover'

function LocalSelect(props: Readonly<ComponentProps<typeof HeroSelect>>) {
  return <HeroSelect {...props} />
}

const Select = Object.assign(LocalSelect, {
  Root: Root,
  Trigger: Trigger,
  Value: Value,
  Indicator: Indicator,
  ClearButton: ClearButton,
  Popover: Popover,
})

export default Select

