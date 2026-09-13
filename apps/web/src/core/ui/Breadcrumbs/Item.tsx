import { BreadcrumbsItem as HeroBreadcrumbsItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function BreadcrumbsItem(props: Readonly<ComponentProps<typeof HeroBreadcrumbsItem>>) {
  return <HeroBreadcrumbsItem {...props} />
}

