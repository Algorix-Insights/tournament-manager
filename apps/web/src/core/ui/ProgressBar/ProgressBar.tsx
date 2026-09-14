import { ProgressBar as HeroProgressBar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/ProgressBar/Root'
import Output from '@/core/ui/ProgressBar/Output'
import Track from '@/core/ui/ProgressBar/Track'
import Fill from '@/core/ui/ProgressBar/Fill'

function LocalProgressBar(props: Readonly<ComponentProps<typeof HeroProgressBar>>) {
  return <HeroProgressBar {...props} />
}

const ProgressBar = Object.assign(LocalProgressBar, {
  Root: Root,
  Output: Output,
  Track: Track,
  Fill: Fill,
})

export default ProgressBar

