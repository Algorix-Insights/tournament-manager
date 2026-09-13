import { Header as HeroHeader } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalHeader(props: Readonly<ComponentProps<typeof HeroHeader>>) {
  return <HeroHeader {...props} />
}

const Header = Object.assign(LocalHeader, {
  Root: LocalHeader,
})

export default Header

