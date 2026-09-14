import { ListBox as HeroListBox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ListBox/Root'
import Item from '@/core/ui/ListBox/Item'
import ItemIndicator from '@/core/ui/ListBox/ItemIndicator'
import Section from '@/core/ui/ListBox/Section'

function LocalListBox(props: Readonly<ComponentProps<typeof HeroListBox>>) {
  return <HeroListBox {...props} />
}

const ListBox = Object.assign(LocalListBox, {
  Root: Root,
  Item: Item,
  ItemIndicator: ItemIndicator,
  Section: Section,
})

export default ListBox

