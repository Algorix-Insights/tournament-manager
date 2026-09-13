import { CheckboxGroup as HeroCheckboxGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalCheckboxGroup(props: Readonly<ComponentProps<typeof HeroCheckboxGroup>>) {
  return <HeroCheckboxGroup {...props} />
}

export default LocalCheckboxGroup

