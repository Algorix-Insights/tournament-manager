import { AccordionHeading as HeroAccordionHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionHeading(props: Readonly<ComponentProps<typeof HeroAccordionHeading>>) {
  return <HeroAccordionHeading {...props} />
}

