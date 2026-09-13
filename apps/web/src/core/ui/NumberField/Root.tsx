import { NumberFieldRoot as HeroNumberFieldRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function NumberFieldRoot(props: Readonly<ComponentProps<typeof HeroNumberFieldRoot>>) {
  return <HeroNumberFieldRoot {...props} />
}

