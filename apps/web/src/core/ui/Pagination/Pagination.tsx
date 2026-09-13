import { Pagination as HeroPagination } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Summary from './Summary'
import Content from './Content'
import Item from './Item'
import Link from './Link'
import Previous from './Previous'
import PreviousIcon from './PreviousIcon'
import Next from './Next'
import NextIcon from './NextIcon'
import Ellipsis from './Ellipsis'

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

