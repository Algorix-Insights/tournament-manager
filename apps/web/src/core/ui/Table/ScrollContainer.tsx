import { TableScrollContainer as HeroTableScrollContainer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableScrollContainer(props: Readonly<ComponentProps<typeof HeroTableScrollContainer>>) {
  return <HeroTableScrollContainer {...props} />
}

