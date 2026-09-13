import { TableHeader as HeroTableHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableHeader(props: Readonly<ComponentProps<typeof HeroTableHeader>>) {
  return <HeroTableHeader {...props} />
}

