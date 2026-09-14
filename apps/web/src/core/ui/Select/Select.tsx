import { Select as HeroSelect } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Select/Root'
import Trigger from '@/core/ui/Select/Trigger'
import Value from '@/core/ui/Select/Value'
import Indicator from '@/core/ui/Select/Indicator'
import ClearButton from '@/core/ui/Select/ClearButton'
import Popover from '@/core/ui/Select/Popover'

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

