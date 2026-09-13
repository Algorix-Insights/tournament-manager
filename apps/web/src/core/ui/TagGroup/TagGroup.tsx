import { TagGroup as HeroTagGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import List from './List'

function LocalTagGroup(props: Readonly<ComponentProps<typeof HeroTagGroup>>) {
  return <HeroTagGroup {...props} />
}

const TagGroup = Object.assign(LocalTagGroup, {
  Root: Root,
  List: List,
})

export default TagGroup

