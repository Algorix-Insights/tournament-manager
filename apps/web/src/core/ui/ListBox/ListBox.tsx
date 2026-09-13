import { ListBox as HeroListBox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Item from './Item'
import ItemIndicator from './ItemIndicator'
import Section from './Section'

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

