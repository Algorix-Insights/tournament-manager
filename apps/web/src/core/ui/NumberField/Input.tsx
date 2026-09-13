import { NumberFieldInput as HeroNumberFieldInput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function NumberFieldInput(props: Readonly<ComponentProps<typeof HeroNumberFieldInput>>) {
  return <HeroNumberFieldInput {...props} />
}

