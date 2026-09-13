import { ButtonGroup as HeroButtonGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Separator from './Separator'

function LocalButtonGroup(props: Readonly<ComponentProps<typeof HeroButtonGroup>>) {
  return <HeroButtonGroup {...props} />
}

const ButtonGroup = Object.assign(LocalButtonGroup, {
  Root: Root,
  Separator: Separator,
})

export default ButtonGroup

