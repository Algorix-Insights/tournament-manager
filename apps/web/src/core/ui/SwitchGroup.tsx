import { SwitchGroup as HeroSwitchGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalSwitchGroup(props: Readonly<ComponentProps<typeof HeroSwitchGroup>>) {
  return <HeroSwitchGroup {...props} />
}

const SwitchGroup = Object.assign(LocalSwitchGroup, {
  Root: LocalSwitchGroup,
})

export default SwitchGroup

