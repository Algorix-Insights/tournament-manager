import { AccordionItem as HeroAccordionItem } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function AccordionItem(props: Readonly<ComponentProps<typeof HeroAccordionItem>>) {
  return <HeroAccordionItem {...props} />
}

