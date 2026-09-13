import { AvatarRoot as HeroAvatarRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AvatarRoot(props: Readonly<ComponentProps<typeof HeroAvatarRoot>>) {
  return <HeroAvatarRoot {...props} />
}

