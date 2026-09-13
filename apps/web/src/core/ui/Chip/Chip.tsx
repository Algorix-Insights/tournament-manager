import { Chip as HeroChip } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Label from './Label'

function LocalChip(props: Readonly<ComponentProps<typeof HeroChip>>) {
  return <HeroChip {...props} />
}

const Chip = Object.assign(LocalChip, {
  Root: Root,
  Label: Label,
})

export default Chip

