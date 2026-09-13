import { InputGroupPrefix as HeroInputGroupPrefix } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function InputGroupPrefix(props: Readonly<ComponentProps<typeof HeroInputGroupPrefix>>) {
  return <HeroInputGroupPrefix {...props} />
}

