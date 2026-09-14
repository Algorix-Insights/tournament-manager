import { Meter as HeroMeter } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Meter/Root'
import Output from '@/core/ui/Meter/Output'
import Track from '@/core/ui/Meter/Track'
import Fill from '@/core/ui/Meter/Fill'

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

