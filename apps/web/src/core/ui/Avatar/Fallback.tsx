import { AvatarFallback as HeroAvatarFallback } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AvatarFallback(props: Readonly<ComponentProps<typeof HeroAvatarFallback>>) {
  return <HeroAvatarFallback {...props} />
}

