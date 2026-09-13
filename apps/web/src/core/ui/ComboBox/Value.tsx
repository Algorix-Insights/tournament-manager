import { ComboBoxValue as HeroComboBoxValue } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ComboBoxValue(props: Readonly<ComponentProps<typeof HeroComboBoxValue>>) {
  return <HeroComboBoxValue {...props} />
}

