import { ProgressBarTrack as HeroProgressBarTrack } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressBarTrack(props: Readonly<ComponentProps<typeof HeroProgressBarTrack>>) {
  return <HeroProgressBarTrack {...props} />
}

