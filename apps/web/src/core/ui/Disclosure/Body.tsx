import { DisclosureBody as HeroDisclosureBody } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureBody(props: Readonly<ComponentProps<typeof HeroDisclosureBody>>) {
  return <HeroDisclosureBody {...props} />
}

