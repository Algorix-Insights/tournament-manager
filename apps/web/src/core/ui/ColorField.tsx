import { ColorField as HeroColorField } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalColorField(props: Readonly<ComponentProps<typeof HeroColorField>>) {
  return <HeroColorField {...props} />
}

const ColorField = Object.assign(LocalColorField, {
  Root: LocalColorField,
})

export default ColorField

