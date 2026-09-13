import { AccordionPanel as HeroAccordionPanel } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionPanel(props: Readonly<ComponentProps<typeof HeroAccordionPanel>>) {
  return <HeroAccordionPanel {...props} />
}

