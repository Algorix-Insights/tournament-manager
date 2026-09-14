import { InputOTP as HeroInputOTP } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/InputOTP/Root'
import Group from '@/core/ui/InputOTP/Group'
import Slot from '@/core/ui/InputOTP/Slot'
import Separator from '@/core/ui/InputOTP/Separator'

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

