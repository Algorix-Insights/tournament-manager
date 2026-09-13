import { ScrollShadow as HeroScrollShadow } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalScrollShadow(props: Readonly<ComponentProps<typeof HeroScrollShadow>>) {
  return <HeroScrollShadow {...props} />
}

const ScrollShadow = Object.assign(LocalScrollShadow, {
  Root: LocalScrollShadow,
})

export default ScrollShadow

