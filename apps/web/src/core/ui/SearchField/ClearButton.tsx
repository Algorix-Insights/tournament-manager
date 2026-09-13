import { SearchFieldClearButton as HeroSearchFieldClearButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SearchFieldClearButton(props: Readonly<ComponentProps<typeof HeroSearchFieldClearButton>>) {
  return <HeroSearchFieldClearButton {...props} />
}

