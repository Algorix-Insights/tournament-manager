import { AutocompleteIndicator as HeroAutocompleteIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompleteIndicator(props: Readonly<ComponentProps<typeof HeroAutocompleteIndicator>>) {
  return <HeroAutocompleteIndicator {...props} />
}

