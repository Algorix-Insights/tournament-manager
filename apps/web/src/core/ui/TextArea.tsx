import { TextArea as HeroTextArea } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalTextArea(props: Readonly<ComponentProps<typeof HeroTextArea>>) {
  return <HeroTextArea {...props} />
}

const TextArea = Object.assign(LocalTextArea, {
  Root: LocalTextArea,
})

export default TextArea

