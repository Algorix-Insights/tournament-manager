import { Separator as HeroSeparator } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalSeparator(props: Readonly<ComponentProps<typeof HeroSeparator>>) {
  return <HeroSeparator {...props} />
}

const Separator = Object.assign(LocalSeparator, {
  Root: LocalSeparator,
})

export default Separator

