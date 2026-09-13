import { ListBoxRoot as HeroListBoxRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ListBoxRoot(props: Readonly<ComponentProps<typeof HeroListBoxRoot>>) {
  return <HeroListBoxRoot {...props} />
}

