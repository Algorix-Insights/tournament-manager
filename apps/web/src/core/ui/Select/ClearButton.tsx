import { SelectClearButton as HeroSelectClearButton } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function SelectClearButton(props: Readonly<ComponentProps<typeof HeroSelectClearButton>>) {
  return <HeroSelectClearButton {...props} />
}

