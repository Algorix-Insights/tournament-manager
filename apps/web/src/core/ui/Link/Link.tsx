import { Link as HeroLink } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Link/Root'
import Icon from '@/core/ui/Link/Icon'

function LocalLink(props: Readonly<ComponentProps<typeof HeroLink>>) {
  return <HeroLink {...props} />
}

const Link = Object.assign(LocalLink, {
  Root: Root,
  Icon: Icon,
})

export default Link

