import { TableCell as HeroTableCell } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableCell(props: Readonly<ComponentProps<typeof HeroTableCell>>) {
  return <HeroTableCell {...props} />
}

