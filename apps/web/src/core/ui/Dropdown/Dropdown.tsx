import { Dropdown as HeroDropdown } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Popover from './Popover'
import Menu from './Menu'
import Section from './Section'
import Item from './Item'
import ItemIndicator from './ItemIndicator'
import SubmenuIndicator from './SubmenuIndicator'
import SubmenuTrigger from './SubmenuTrigger'

function LocalDropdown(props: Readonly<ComponentProps<typeof HeroDropdown>>) {
  return <HeroDropdown {...props} />
}

const Dropdown = Object.assign(LocalDropdown, {
  Root: Root,
  Trigger: Trigger,
  Popover: Popover,
  Menu: Menu,
  Section: Section,
  Item: Item,
  ItemIndicator: ItemIndicator,
  SubmenuIndicator: SubmenuIndicator,
  SubmenuTrigger: SubmenuTrigger,
})

export default Dropdown

