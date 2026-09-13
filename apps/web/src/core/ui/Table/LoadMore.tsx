import { TableLoadMoreItem as HeroTableLoadMoreItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableLoadMoreItem(props: Readonly<ComponentProps<typeof HeroTableLoadMoreItem>>) {
  return <HeroTableLoadMoreItem {...props} />
}

