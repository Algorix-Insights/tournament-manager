import { TabsRoot as HeroTabsRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabsRoot(props: Readonly<ComponentProps<typeof HeroTabsRoot>>) {
  return <HeroTabsRoot {...props} />
}

