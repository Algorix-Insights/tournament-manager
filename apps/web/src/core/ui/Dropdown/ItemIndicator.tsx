import { DropdownItemIndicator as HeroDropdownItemIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DropdownItemIndicator(props: Readonly<ComponentProps<typeof HeroDropdownItemIndicator>>) {
  return <HeroDropdownItemIndicator {...props} />
}

