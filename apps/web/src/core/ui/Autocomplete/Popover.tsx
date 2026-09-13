import { AutocompletePopover as HeroAutocompletePopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AutocompletePopover(props: Readonly<ComponentProps<typeof HeroAutocompletePopover>>) {
  return <HeroAutocompletePopover {...props} />
}

