import { Avatar as HeroAvatar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Image from './Image'
import Fallback from './Fallback'

function LocalAvatar(props: Readonly<ComponentProps<typeof HeroAvatar>>) {
  return <HeroAvatar {...props} />
}

const Avatar = Object.assign(LocalAvatar, {
  Root: Root,
  Image: Image,
  Fallback: Fallback,
})

export default Avatar

