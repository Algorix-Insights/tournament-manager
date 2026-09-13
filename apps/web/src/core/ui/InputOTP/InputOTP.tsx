import { InputOTP as HeroInputOTP } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Group from './Group'
import Slot from './Slot'
import Separator from './Separator'

function LocalInputOTP(props: Readonly<ComponentProps<typeof HeroInputOTP>>) {
  return <HeroInputOTP {...props} />
}

const InputOTP = Object.assign(LocalInputOTP, {
  Root: Root,
  Group: Group,
  Slot: Slot,
  Separator: Separator,
})

export default InputOTP

