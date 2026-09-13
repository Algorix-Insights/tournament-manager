import { Tab as HeroTab } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Tab(props: Readonly<ComponentProps<typeof HeroTab>>) {
  return <HeroTab {...props} />
}

