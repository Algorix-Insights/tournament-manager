import { PaginationEllipsis as HeroPaginationEllipsis } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationEllipsis(props: Readonly<ComponentProps<typeof HeroPaginationEllipsis>>) {
  return <HeroPaginationEllipsis {...props} />
}

