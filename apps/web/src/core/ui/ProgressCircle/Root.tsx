import { ProgressCircleRoot as HeroProgressCircleRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressCircleRoot(props: Readonly<ComponentProps<typeof HeroProgressCircleRoot>>) {
  return <HeroProgressCircleRoot {...props} />
}

