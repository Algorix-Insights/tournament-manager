import { InputGroupInput as HeroInputGroupInput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function InputGroupInput(props: Readonly<ComponentProps<typeof HeroInputGroupInput>>) {
  return <HeroInputGroupInput {...props} />
}

