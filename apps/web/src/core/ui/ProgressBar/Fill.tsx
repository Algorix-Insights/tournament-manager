import { ProgressBarFill as HeroProgressBarFill } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ProgressBarFill(props: Readonly<ComponentProps<typeof HeroProgressBarFill>>) {
  return <HeroProgressBarFill {...props} />
}

