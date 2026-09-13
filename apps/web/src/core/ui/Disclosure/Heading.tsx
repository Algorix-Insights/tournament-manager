import { DisclosureHeading as HeroDisclosureHeading } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureHeading(props: Readonly<ComponentProps<typeof HeroDisclosureHeading>>) {
  return <HeroDisclosureHeading {...props} />
}

