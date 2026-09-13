import { MenuSection as HeroMenuSection } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalMenuSection(props: Readonly<ComponentProps<typeof HeroMenuSection>>) {
  return <HeroMenuSection {...props} />
}

const MenuSection = Object.assign(LocalMenuSection, {
  Root: LocalMenuSection,
})

export default MenuSection

