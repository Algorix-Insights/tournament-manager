import { PaginationItem as HeroPaginationItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationItem(props: Readonly<ComponentProps<typeof HeroPaginationItem>>) {
  return <HeroPaginationItem {...props} />
}

