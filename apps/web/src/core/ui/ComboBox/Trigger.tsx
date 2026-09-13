import { ComboBoxTrigger as HeroComboBoxTrigger } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ComboBoxTrigger(props: Readonly<ComponentProps<typeof HeroComboBoxTrigger>>) {
  return <HeroComboBoxTrigger {...props} />
}

