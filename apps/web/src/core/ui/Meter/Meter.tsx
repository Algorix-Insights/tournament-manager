import { Meter as HeroMeter } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Output from './Output'
import Track from './Track'
import Fill from './Fill'

function LocalMeter(props: Readonly<ComponentProps<typeof HeroMeter>>) {
  return <HeroMeter {...props} />
}

const Meter = Object.assign(LocalMeter, {
  Root: Root,
  Output: Output,
  Track: Track,
  Fill: Fill,
})

export default Meter

