import { MeterRoot as HeroMeterRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function MeterRoot(props: Readonly<ComponentProps<typeof HeroMeterRoot>>) {
  return <HeroMeterRoot {...props} />
}

