import { DropdownSection as HeroDropdownSection } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownSection(props: Readonly<ComponentProps<typeof HeroDropdownSection>>) {
  return <HeroDropdownSection {...props} />
}

