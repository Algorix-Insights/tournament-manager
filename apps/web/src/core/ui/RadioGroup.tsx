import { RadioGroup as HeroRadioGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalRadioGroup(props: Readonly<ComponentProps<typeof HeroRadioGroup>>) {
  return <HeroRadioGroup {...props} />
}

const RadioGroup = Object.assign(LocalRadioGroup, {
  Root: LocalRadioGroup,
})

export default RadioGroup

