import { AccordionRoot as HeroAccordionRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionRoot(props: Readonly<ComponentProps<typeof HeroAccordionRoot>>) {
  return <HeroAccordionRoot {...props} />
}

