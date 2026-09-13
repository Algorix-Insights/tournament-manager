import { TextField as HeroTextField } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalTextField(props: Readonly<ComponentProps<typeof HeroTextField>>) {
  return <HeroTextField {...props} />
}

const TextField = Object.assign(LocalTextField, {
  Root: LocalTextField,
})

export default TextField

