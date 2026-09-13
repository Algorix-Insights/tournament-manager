import { SearchFieldInput as HeroSearchFieldInput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SearchFieldInput(props: Readonly<ComponentProps<typeof HeroSearchFieldInput>>) {
  return <HeroSearchFieldInput {...props} />
}

