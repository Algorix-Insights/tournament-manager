import { SelectValue as HeroSelectValue } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectValue(props: Readonly<ComponentProps<typeof HeroSelectValue>>) {
  return <HeroSelectValue {...props} />
}

