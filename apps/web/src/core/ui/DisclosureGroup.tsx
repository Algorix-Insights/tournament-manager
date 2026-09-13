import { DisclosureGroup as HeroDisclosureGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalDisclosureGroup(props: Readonly<ComponentProps<typeof HeroDisclosureGroup>>) {
  return <HeroDisclosureGroup {...props} />
}

const DisclosureGroup = Object.assign(LocalDisclosureGroup, {
  Root: LocalDisclosureGroup,
})

export default DisclosureGroup

