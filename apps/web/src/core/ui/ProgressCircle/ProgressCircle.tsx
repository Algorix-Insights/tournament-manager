import { ProgressCircle as HeroProgressCircle } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ProgressCircle/Root'
import Track from '@/core/ui/ProgressCircle/Track'
import TrackCircle from '@/core/ui/ProgressCircle/TrackCircle'
import FillCircle from '@/core/ui/ProgressCircle/FillCircle'

function LocalProgressCircle(props: Readonly<ComponentProps<typeof HeroProgressCircle>>) {
  return <HeroProgressCircle {...props} />
}

const ProgressCircle = Object.assign(LocalProgressCircle, {
  Root: Root,
  Track: Track,
  TrackCircle: TrackCircle,
  FillCircle: FillCircle,
})

export default ProgressCircle

