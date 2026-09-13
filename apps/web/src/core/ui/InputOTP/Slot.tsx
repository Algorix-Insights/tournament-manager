import { InputOTPSlot as HeroInputOTPSlot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function InputOTPSlot(props: Readonly<ComponentProps<typeof HeroInputOTPSlot>>) {
  return <HeroInputOTPSlot {...props} />
}

