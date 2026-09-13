import { AutocompleteRoot as HeroAutocompleteRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompleteRoot(props: Readonly<ComponentProps<typeof HeroAutocompleteRoot>>) {
  return <HeroAutocompleteRoot {...props} />
}

