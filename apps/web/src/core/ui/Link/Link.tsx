import { Link as HeroLink } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Icon from './Icon'

function LocalLink(props: Readonly<ComponentProps<typeof HeroLink>>) {
  return <HeroLink {...props} />
}

const Link = Object.assign(LocalLink, {
  Root: Root,
  Icon: Icon,
})

export default Link

