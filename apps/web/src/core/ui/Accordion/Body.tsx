import { AccordionBody as HeroAccordionBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionBody(props: Readonly<ComponentProps<typeof HeroAccordionBody>>) {
  return <HeroAccordionBody {...props} />
}

