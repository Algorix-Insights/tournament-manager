import { TableColumnResizer as HeroTableColumnResizer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableColumnResizer(props: Readonly<ComponentProps<typeof HeroTableColumnResizer>>) {
  return <HeroTableColumnResizer {...props} />
}

