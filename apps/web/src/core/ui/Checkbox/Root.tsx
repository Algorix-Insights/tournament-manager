import { CheckboxRoot as HeroCheckboxRoot } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CheckboxRoot(props: Readonly<ComponentProps<typeof HeroCheckboxRoot>>) {
  return <HeroCheckboxRoot {...props} />
}

