import { CheckboxIndicator as HeroCheckboxIndicator } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CheckboxIndicator(props: Readonly<ComponentProps<typeof HeroCheckboxIndicator>>) {
  return <HeroCheckboxIndicator {...props} />
}

