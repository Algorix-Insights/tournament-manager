import { Kbd as HeroKbd } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Abbr from './Abbr'
import Content from './Content'

function LocalKbd(props: Readonly<ComponentProps<typeof HeroKbd>>) {
  return <HeroKbd {...props} />
}

const Kbd = Object.assign(LocalKbd, {
  Root: Root,
  Abbr: Abbr,
  Content: Content,
})

export default Kbd

