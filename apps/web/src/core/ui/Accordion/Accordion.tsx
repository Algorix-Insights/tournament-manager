import { Accordion as HeroAccordion } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Accordion/Root'
import Item from '@/core/ui/Accordion/Item'
import Heading from '@/core/ui/Accordion/Heading'
import Trigger from '@/core/ui/Accordion/Trigger'
import Panel from '@/core/ui/Accordion/Panel'
import Indicator from '@/core/ui/Accordion/Indicator'
import Body from '@/core/ui/Accordion/Body'

function LocalAccordion(props: Readonly<ComponentProps<typeof HeroAccordion>>) {
  return <HeroAccordion {...props} />
}

const Accordion = Object.assign(LocalAccordion, {
  Root: Root,
  Item: Item,
  Heading: Heading,
  Trigger: Trigger,
  Panel: Panel,
  Indicator: Indicator,
  Body: Body,
})

export default Accordion

