import { NumberField as HeroNumberField } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Group from './Group'
import Input from './Input'
import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'

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

