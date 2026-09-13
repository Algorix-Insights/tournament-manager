import { TableRow as HeroTableRow } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableRow(props: Readonly<ComponentProps<typeof HeroTableRow>>) {
  return <HeroTableRow {...props} />
}

