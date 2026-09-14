import { Avatar as HeroAvatar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Avatar/Root'
import Image from '@/core/ui/Avatar/Image'
import Fallback from '@/core/ui/Avatar/Fallback'

function LocalAvatar(props: Readonly<ComponentProps<typeof HeroAvatar>>) {
  return <HeroAvatar {...props} />
}

const Avatar = Object.assign(LocalAvatar, {
  Root: Root,
  Image: Image,
  Fallback: Fallback,
})

export default Avatar

