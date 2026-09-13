import { SearchFieldGroup as HeroSearchFieldGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SearchFieldGroup(props: Readonly<ComponentProps<typeof HeroSearchFieldGroup>>) {
  return <HeroSearchFieldGroup {...props} />
}

