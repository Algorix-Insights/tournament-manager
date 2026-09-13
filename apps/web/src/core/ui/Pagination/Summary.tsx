import { PaginationSummary as HeroPaginationSummary } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationSummary(props: Readonly<ComponentProps<typeof HeroPaginationSummary>>) {
  return <HeroPaginationSummary {...props} />
}

