import { CheckboxControl as HeroCheckboxControl } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CheckboxControl(props: Readonly<ComponentProps<typeof HeroCheckboxControl>>) {
  return <HeroCheckboxControl {...props} />
}

