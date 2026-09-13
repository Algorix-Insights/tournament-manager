import { InputGroup as HeroInputGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Input from './Input'
import TextArea from './TextArea'
import Prefix from './Prefix'
import Suffix from './Suffix'

function LocalInputGroup(props: Readonly<ComponentProps<typeof HeroInputGroup>>) {
  return <HeroInputGroup {...props} />
}

const InputGroup = Object.assign(LocalInputGroup, {
  Root: Root,
  Input: Input,
  TextArea: TextArea,
  Prefix: Prefix,
  Suffix: Suffix,
})

export default InputGroup

