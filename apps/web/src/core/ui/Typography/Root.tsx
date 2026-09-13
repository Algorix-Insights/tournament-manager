import { TypographyRoot as HeroTypographyRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TypographyRoot(props: Readonly<ComponentProps<typeof HeroTypographyRoot>>) {
  return <HeroTypographyRoot {...props} />
}

