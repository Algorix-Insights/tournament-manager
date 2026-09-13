import { TableColumn as HeroTableColumn } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableColumn(props: Readonly<ComponentProps<typeof HeroTableColumn>>) {
  return <HeroTableColumn {...props} />
}

