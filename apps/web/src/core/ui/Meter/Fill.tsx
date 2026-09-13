import { MeterFill as HeroMeterFill } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MeterFill(props: Readonly<ComponentProps<typeof HeroMeterFill>>) {
  return <HeroMeterFill {...props} />
}

