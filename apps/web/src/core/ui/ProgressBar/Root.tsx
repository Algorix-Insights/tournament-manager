import { ProgressBarRoot as HeroProgressBarRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressBarRoot(props: Readonly<ComponentProps<typeof HeroProgressBarRoot>>) {
  return <HeroProgressBarRoot {...props} />
}

