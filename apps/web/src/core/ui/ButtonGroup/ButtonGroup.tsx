import { ButtonGroup as HeroButtonGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ButtonGroup/Root'
import Separator from '@/core/ui/ButtonGroup/Separator'

function LocalButtonGroup(props: Readonly<ComponentProps<typeof HeroButtonGroup>>) {
  return <HeroButtonGroup {...props} />
}

const ButtonGroup = Object.assign(LocalButtonGroup, {
  Root: Root,
  Separator: Separator,
})

export default ButtonGroup

