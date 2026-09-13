import { Label as HeroLabel } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalLabel(props: Readonly<ComponentProps<typeof HeroLabel>>) {
  return <HeroLabel {...props} />
}

const Label = Object.assign(LocalLabel, {
  Root: LocalLabel,
})

export default Label

