import { ListBoxItem as HeroListBoxItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ListBoxItem(props: Readonly<ComponentProps<typeof HeroListBoxItem>>) {
  return <HeroListBoxItem {...props} />
}

