import { CheckboxContent as HeroCheckboxContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function CheckboxContent(props: Readonly<ComponentProps<typeof HeroCheckboxContent>>) {
  return <HeroCheckboxContent {...props} />
}

