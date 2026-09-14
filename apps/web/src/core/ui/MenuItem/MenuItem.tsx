import { MenuItem as HeroMenuItem } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/MenuItem/Root'
import Indicator from '@/core/ui/MenuItem/Indicator'
import SubmenuIndicator from '@/core/ui/MenuItem/SubmenuIndicator'

function LocalMenuItem(props: Readonly<ComponentProps<typeof HeroMenuItem>>) {
  return <HeroMenuItem {...props} />
}

const MenuItem = Object.assign(LocalMenuItem, {
  Root: Root,
  Indicator: Indicator,
  SubmenuIndicator: SubmenuIndicator,
})

export default MenuItem

