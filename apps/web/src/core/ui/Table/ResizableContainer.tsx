import { TableResizableContainer as HeroTableResizableContainer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TableResizableContainer(props: Readonly<ComponentProps<typeof HeroTableResizableContainer>>) {
  return <HeroTableResizableContainer {...props} />
}

