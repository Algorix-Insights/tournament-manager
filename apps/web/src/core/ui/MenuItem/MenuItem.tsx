import { MenuItem as HeroMenuItem } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Indicator from './Indicator'
import SubmenuIndicator from './SubmenuIndicator'

function LocalMenuItem(props: Readonly<ComponentProps<typeof HeroMenuItem>>) {
  return <HeroMenuItem {...props} />
}

const MenuItem = Object.assign(LocalMenuItem, {
  Root: Root,
  Indicator: Indicator,
  SubmenuIndicator: SubmenuIndicator,
})

export default MenuItem

