import { MeterTrack as HeroMeterTrack } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MeterTrack(props: Readonly<ComponentProps<typeof HeroMeterTrack>>) {
  return <HeroMeterTrack {...props} />
}

