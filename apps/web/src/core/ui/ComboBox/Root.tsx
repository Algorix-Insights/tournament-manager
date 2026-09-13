import { ComboBoxRoot as HeroComboBoxRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function ComboBoxRoot(props: Readonly<ComponentProps<typeof HeroComboBoxRoot>>) {
  return <HeroComboBoxRoot {...props} />
}

