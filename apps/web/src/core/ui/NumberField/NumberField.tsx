import { NumberField as HeroNumberField } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/NumberField/Root'
import Group from '@/core/ui/NumberField/Group'
import Input from '@/core/ui/NumberField/Input'
import IncrementButton from '@/core/ui/NumberField/IncrementButton'
import DecrementButton from '@/core/ui/NumberField/DecrementButton'

function LocalNumberField(props: Readonly<ComponentProps<typeof HeroNumberField>>) {
  return <HeroNumberField {...props} />
}

const NumberField = Object.assign(LocalNumberField, {
  Root: Root,
  Group: Group,
  Input: Input,
  IncrementButton: IncrementButton,
  DecrementButton: DecrementButton,
})

export default NumberField

