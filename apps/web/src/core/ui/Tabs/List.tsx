import { TabList as HeroTabList } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabList(props: Readonly<ComponentProps<typeof HeroTabList>>) {
  return <HeroTabList {...props} />
}

