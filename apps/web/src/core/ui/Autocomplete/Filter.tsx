import { AutocompleteFilter as HeroAutocompleteFilter } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompleteFilter(props: Readonly<ComponentProps<typeof HeroAutocompleteFilter>>) {
  return <HeroAutocompleteFilter {...props} />
}

