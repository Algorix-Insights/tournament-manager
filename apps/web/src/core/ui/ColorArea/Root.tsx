import { ColorAreaRoot as HeroColorAreaRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ColorAreaRoot(props: Readonly<ComponentProps<typeof HeroColorAreaRoot>>) {
  return <HeroColorAreaRoot {...props} />
}

