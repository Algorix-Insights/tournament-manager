import { AccordionTrigger as HeroAccordionTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionTrigger(props: Readonly<ComponentProps<typeof HeroAccordionTrigger>>) {
  return <HeroAccordionTrigger {...props} />
}

