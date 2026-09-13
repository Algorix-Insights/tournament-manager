import { MeterOutput as HeroMeterOutput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MeterOutput(props: Readonly<ComponentProps<typeof HeroMeterOutput>>) {
  return <HeroMeterOutput {...props} />
}

