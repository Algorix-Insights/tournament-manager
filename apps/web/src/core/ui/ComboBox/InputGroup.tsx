import { ComboBoxInputGroup as HeroComboBoxInputGroup } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ComboBoxInputGroup(props: Readonly<ComponentProps<typeof HeroComboBoxInputGroup>>) {
  return <HeroComboBoxInputGroup {...props} />
}

