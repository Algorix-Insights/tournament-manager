import { TableFooter as HeroTableFooter } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableFooter(props: Readonly<ComponentProps<typeof HeroTableFooter>>) {
  return <HeroTableFooter {...props} />
}

