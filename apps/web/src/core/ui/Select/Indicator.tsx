import { SelectIndicator as HeroSelectIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectIndicator(props: Readonly<ComponentProps<typeof HeroSelectIndicator>>) {
  return <HeroSelectIndicator {...props} />
}

