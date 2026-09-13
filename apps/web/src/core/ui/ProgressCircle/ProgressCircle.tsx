import { ProgressCircle as HeroProgressCircle } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Track from './Track'
import TrackCircle from './TrackCircle'
import FillCircle from './FillCircle'

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

