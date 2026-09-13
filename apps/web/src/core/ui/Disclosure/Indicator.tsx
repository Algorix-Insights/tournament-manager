import { DisclosureIndicator as HeroDisclosureIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureIndicator(props: Readonly<ComponentProps<typeof HeroDisclosureIndicator>>) {
  return <HeroDisclosureIndicator {...props} />
}

