import { Pagination as HeroPagination } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Pagination/Root'
import Summary from '@/core/ui/Pagination/Summary'
import Content from '@/core/ui/Pagination/Content'
import Item from '@/core/ui/Pagination/Item'
import Link from '@/core/ui/Pagination/Link'
import Previous from '@/core/ui/Pagination/Previous'
import PreviousIcon from '@/core/ui/Pagination/PreviousIcon'
import Next from '@/core/ui/Pagination/Next'
import NextIcon from '@/core/ui/Pagination/NextIcon'
import Ellipsis from '@/core/ui/Pagination/Ellipsis'

function LocalPagination(props: Readonly<ComponentProps<typeof HeroPagination>>) {
  return <HeroPagination {...props} />
}

const Pagination = Object.assign(LocalPagination, {
  Root: Root,
  Summary: Summary,
  Content: Content,
  Item: Item,
  Link: Link,
  Previous: Previous,
  PreviousIcon: PreviousIcon,
  Next: Next,
  NextIcon: NextIcon,
  Ellipsis: Ellipsis,
})

export default Pagination

