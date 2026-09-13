import { Input as HeroInput } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalInput(props: Readonly<ComponentProps<typeof HeroInput>>) {
  return <HeroInput {...props} />
}

const Input = Object.assign(LocalInput, {
  Root: LocalInput,
})

export default Input

