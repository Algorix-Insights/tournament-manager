import { Button as HeroButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Button(props: Readonly<ComponentProps<typeof HeroButton>>) {
  return <HeroButton {...props} />
}

