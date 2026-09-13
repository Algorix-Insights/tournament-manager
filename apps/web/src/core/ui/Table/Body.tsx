import { TableBody as HeroTableBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableBody(props: Readonly<ComponentProps<typeof HeroTableBody>>) {
  return <HeroTableBody {...props} />
}

