import { Chip as HeroChip } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Chip/Root'
import Label from '@/core/ui/Chip/Label'

function LocalChip(props: Readonly<ComponentProps<typeof HeroChip>>) {
  return <HeroChip {...props} />
}

const Chip = Object.assign(LocalChip, {
  Root: Root,
  Label: Label,
})

export default Chip

