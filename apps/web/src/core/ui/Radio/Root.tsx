import { RadioRoot as HeroRadioRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RadioRoot(props: Readonly<ComponentProps<typeof HeroRadioRoot>>) {
  return <HeroRadioRoot {...props} />
}

