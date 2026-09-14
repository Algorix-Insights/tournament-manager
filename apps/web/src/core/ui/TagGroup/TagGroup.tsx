import { TagGroup as HeroTagGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/TagGroup/Root'
import List from '@/core/ui/TagGroup/List'

function LocalTagGroup(props: Readonly<ComponentProps<typeof HeroTagGroup>>) {
  return <HeroTagGroup {...props} />
}

const TagGroup = Object.assign(LocalTagGroup, {
  Root: Root,
  List: List,
})

export default TagGroup

