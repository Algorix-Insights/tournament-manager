import { RadioIndicator as HeroRadioIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RadioIndicator(props: Readonly<ComponentProps<typeof HeroRadioIndicator>>) {
  return <HeroRadioIndicator {...props} />
}

