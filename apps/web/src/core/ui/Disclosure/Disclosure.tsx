import { Disclosure as HeroDisclosure } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Disclosure/Root'
import Heading from '@/core/ui/Disclosure/Heading'
import Trigger from '@/core/ui/Disclosure/Trigger'
import Content from '@/core/ui/Disclosure/Content'
import Body from '@/core/ui/Disclosure/Body'
import Indicator from '@/core/ui/Disclosure/Indicator'

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

