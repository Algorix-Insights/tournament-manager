import { Tag as HeroTag } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import RemoveButton from './RemoveButton'

function LocalTag(props: Readonly<ComponentProps<typeof HeroTag>>) {
  return <HeroTag {...props} />
}

const Tag = Object.assign(LocalTag, {
  Root: Root,
  RemoveButton: RemoveButton,
})

export default Tag

