import { ProgressCircleTrack as HeroProgressCircleTrack } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressCircleTrack(props: Readonly<ComponentProps<typeof HeroProgressCircleTrack>>) {
  return <HeroProgressCircleTrack {...props} />
}

