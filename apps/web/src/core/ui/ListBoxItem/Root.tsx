import { ListBoxItemRoot as HeroListBoxItemRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ListBoxItemRoot(props: Readonly<ComponentProps<typeof HeroListBoxItemRoot>>) {
  return <HeroListBoxItemRoot {...props} />
}

