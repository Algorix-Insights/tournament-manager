import { PaginationLink as HeroPaginationLink } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function PaginationLink(props: Readonly<ComponentProps<typeof HeroPaginationLink>>) {
  return <HeroPaginationLink {...props} />
}

