import { PaginationRoot as HeroPaginationRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationRoot(props: Readonly<ComponentProps<typeof HeroPaginationRoot>>) {
  return <HeroPaginationRoot {...props} />
}

