import { ProgressBarOutput as HeroProgressBarOutput } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressBarOutput(props: Readonly<ComponentProps<typeof HeroProgressBarOutput>>) {
  return <HeroProgressBarOutput {...props} />
}

