import { RadioControl as HeroRadioControl } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RadioControl(props: Readonly<ComponentProps<typeof HeroRadioControl>>) {
  return <HeroRadioControl {...props} />
}

