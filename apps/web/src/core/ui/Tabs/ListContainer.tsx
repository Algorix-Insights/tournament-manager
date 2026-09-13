import { TabListContainer as HeroTabListContainer } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabListContainer(props: Readonly<ComponentProps<typeof HeroTabListContainer>>) {
  return <HeroTabListContainer {...props} />
}

