import { ListBoxSection as HeroListBoxSection } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalListBoxSection(props: Readonly<ComponentProps<typeof HeroListBoxSection>>) {
  return <HeroListBoxSection {...props} />
}

const ListBoxSection = Object.assign(LocalListBoxSection, {
  Root: LocalListBoxSection,
})

export default ListBoxSection

