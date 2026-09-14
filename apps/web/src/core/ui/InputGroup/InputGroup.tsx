import { InputGroup as HeroInputGroup } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/InputGroup/Root'
import Input from '@/core/ui/InputGroup/Input'
import TextArea from '@/core/ui/InputGroup/TextArea'
import Prefix from '@/core/ui/InputGroup/Prefix'
import Suffix from '@/core/ui/InputGroup/Suffix'

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

