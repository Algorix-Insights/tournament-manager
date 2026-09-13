import { TabIndicator as HeroTabIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabIndicator(props: Readonly<ComponentProps<typeof HeroTabIndicator>>) {
  return <HeroTabIndicator {...props} />
}

