import { Dropdown as HeroDropdown } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Dropdown/Root'
import Trigger from '@/core/ui/Dropdown/Trigger'
import Popover from '@/core/ui/Dropdown/Popover'
import Menu from '@/core/ui/Dropdown/Menu'
import Section from '@/core/ui/Dropdown/Section'
import Item from '@/core/ui/Dropdown/Item'
import ItemIndicator from '@/core/ui/Dropdown/ItemIndicator'
import SubmenuIndicator from '@/core/ui/Dropdown/SubmenuIndicator'
import SubmenuTrigger from '@/core/ui/Dropdown/SubmenuTrigger'

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

