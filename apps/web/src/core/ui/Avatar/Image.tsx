import { AvatarImage as HeroAvatarImage } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AvatarImage(props: Readonly<ComponentProps<typeof HeroAvatarImage>>) {
  return <HeroAvatarImage {...props} />
}

