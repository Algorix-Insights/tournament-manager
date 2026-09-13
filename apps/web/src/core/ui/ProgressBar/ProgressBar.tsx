import { ProgressBar as HeroProgressBar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Output from './Output'
import Track from './Track'
import Fill from './Fill'

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

