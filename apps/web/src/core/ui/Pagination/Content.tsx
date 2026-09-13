import { PaginationContent as HeroPaginationContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationContent(props: Readonly<ComponentProps<typeof HeroPaginationContent>>) {
  return <HeroPaginationContent {...props} />
}

