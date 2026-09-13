import { TabSeparator as HeroTabSeparator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabSeparator(props: Readonly<ComponentProps<typeof HeroTabSeparator>>) {
  return <HeroTabSeparator {...props} />
}

