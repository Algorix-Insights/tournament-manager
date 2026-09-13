import { Menu as HeroMenu } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalMenu(props: Readonly<ComponentProps<typeof HeroMenu>>) {
  return <HeroMenu {...props} />
}

const Menu = Object.assign(LocalMenu, {
  Root: LocalMenu,
})

export default Menu

