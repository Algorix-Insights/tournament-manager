import { TableSortableColumnHeader as HeroTableSortableColumnHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableSortableColumnHeader(props: Readonly<ComponentProps<typeof HeroTableSortableColumnHeader>>) {
  return <HeroTableSortableColumnHeader {...props} />
}

