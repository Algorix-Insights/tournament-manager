import { Breadcrumbs as HeroBreadcrumbs } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Item from './Item'

function LocalBreadcrumbs(props: Readonly<ComponentProps<typeof HeroBreadcrumbs>>) {
  return <HeroBreadcrumbs {...props} />
}

const Breadcrumbs = Object.assign(LocalBreadcrumbs, {
  Root: Root,
  Item: Item,
})

export default Breadcrumbs

