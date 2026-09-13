import { ListBoxItemIndicator as HeroListBoxItemIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ListBoxItemIndicator(props: Readonly<ComponentProps<typeof HeroListBoxItemIndicator>>) {
  return <HeroListBoxItemIndicator {...props} />
}

