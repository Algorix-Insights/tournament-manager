import { AutocompleteValue as HeroAutocompleteValue } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompleteValue(props: Readonly<ComponentProps<typeof HeroAutocompleteValue>>) {
  return <HeroAutocompleteValue {...props} />
}

