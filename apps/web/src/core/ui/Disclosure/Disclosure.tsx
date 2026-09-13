import { Disclosure as HeroDisclosure } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Heading from './Heading'
import Trigger from './Trigger'
import Content from './Content'
import Body from './Body'
import Indicator from './Indicator'

function LocalDisclosure(props: Readonly<ComponentProps<typeof HeroDisclosure>>) {
  return <HeroDisclosure {...props} />
}

const Disclosure = Object.assign(LocalDisclosure, {
  Root: Root,
  Heading: Heading,
  Trigger: Trigger,
  Content: Content,
  Body: Body,
  Indicator: Indicator,
})

export default Disclosure

