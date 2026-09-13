import { BreadcrumbsRoot as HeroBreadcrumbsRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function BreadcrumbsRoot(props: Readonly<ComponentProps<typeof HeroBreadcrumbsRoot>>) {
  return <HeroBreadcrumbsRoot {...props} />
}

