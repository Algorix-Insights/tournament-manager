import { Kbd as HeroKbd } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Kbd/Root'
import Abbr from '@/core/ui/Kbd/Abbr'
import Content from '@/core/ui/Kbd/Content'

function LocalKbd(props: Readonly<ComponentProps<typeof HeroKbd>>) {
  return <HeroKbd {...props} />
}

const Kbd = Object.assign(LocalKbd, {
  Root: Root,
  Abbr: Abbr,
  Content: Content,
})

export default Kbd

