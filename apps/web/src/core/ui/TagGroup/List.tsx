import { TagGroupList as HeroTagGroupList } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TagGroupList(props: Readonly<ComponentProps<typeof HeroTagGroupList>>) {
  return <HeroTagGroupList {...props} />
}

