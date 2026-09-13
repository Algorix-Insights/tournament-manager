import { SearchFieldRoot as HeroSearchFieldRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SearchFieldRoot(props: Readonly<ComponentProps<typeof HeroSearchFieldRoot>>) {
  return <HeroSearchFieldRoot {...props} />
}

