import { ColorAreaThumb as HeroColorAreaThumb } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorAreaThumb(props: Readonly<ComponentProps<typeof HeroColorAreaThumb>>) {
  return <HeroColorAreaThumb {...props} />
}

