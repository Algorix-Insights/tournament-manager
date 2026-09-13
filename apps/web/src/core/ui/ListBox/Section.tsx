import { ListBoxSection as HeroListBoxSection } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ListBoxSection(props: Readonly<ComponentProps<typeof HeroListBoxSection>>) {
  return <HeroListBoxSection {...props} />
}

