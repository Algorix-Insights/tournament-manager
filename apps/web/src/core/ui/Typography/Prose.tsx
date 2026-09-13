import { Prose as HeroProse } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Prose(props: Readonly<ComponentProps<typeof HeroProse>>) {
  return <HeroProse {...props} />
}

