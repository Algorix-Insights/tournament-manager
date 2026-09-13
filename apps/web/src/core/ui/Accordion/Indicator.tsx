import { AccordionIndicator as HeroAccordionIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionIndicator(props: Readonly<ComponentProps<typeof HeroAccordionIndicator>>) {
  return <HeroAccordionIndicator {...props} />
}

