import { DisclosureContent as HeroDisclosureContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DisclosureContent(props: Readonly<ComponentProps<typeof HeroDisclosureContent>>) {
  return <HeroDisclosureContent {...props} />
}

