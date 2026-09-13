import { PaginationNext as HeroPaginationNext } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationNext(props: Readonly<ComponentProps<typeof HeroPaginationNext>>) {
  return <HeroPaginationNext {...props} />
}

