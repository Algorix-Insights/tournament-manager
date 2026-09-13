import { ComboBoxPopover as HeroComboBoxPopover } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ComboBoxPopover(props: Readonly<ComponentProps<typeof HeroComboBoxPopover>>) {
  return <HeroComboBoxPopover {...props} />
}

