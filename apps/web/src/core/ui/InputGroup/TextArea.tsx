import { InputGroupTextArea as HeroInputGroupTextArea } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function InputGroupTextArea(props: Readonly<ComponentProps<typeof HeroInputGroupTextArea>>) {
  return <HeroInputGroupTextArea {...props} />
}

