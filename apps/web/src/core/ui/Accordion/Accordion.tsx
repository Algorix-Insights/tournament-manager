import { Accordion as HeroAccordion } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Item from './Item'
import Heading from './Heading'
import Trigger from './Trigger'
import Panel from './Panel'
import Indicator from './Indicator'
import Body from './Body'

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

