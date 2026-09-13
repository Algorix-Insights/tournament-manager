import { TableContent as HeroTableContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableContent(props: Readonly<ComponentProps<typeof HeroTableContent>>) {
  return <HeroTableContent {...props} />
}

