import { RadioContent as HeroRadioContent } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function RadioContent(props: Readonly<ComponentProps<typeof HeroRadioContent>>) {
  return <HeroRadioContent {...props} />
}

