import { ListBoxItem as HeroListBoxItem } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Indicator from './Indicator'

function LocalListBoxItem(props: Readonly<ComponentProps<typeof HeroListBoxItem>>) {
  return <HeroListBoxItem {...props} />
}

const ListBoxItem = Object.assign(LocalListBoxItem, {
  Root: Root,
  Indicator: Indicator,
})

export default ListBoxItem

