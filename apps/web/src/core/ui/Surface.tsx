import { Surface as HeroSurface } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalSurface(props: Readonly<ComponentProps<typeof HeroSurface>>) {
  return <HeroSurface {...props} />
}

const Surface = Object.assign(LocalSurface, {
  Root: LocalSurface,
})

export default Surface

