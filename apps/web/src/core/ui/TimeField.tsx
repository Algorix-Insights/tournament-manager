import { TimeField as HeroTimeField } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalTimeField(props: Readonly<ComponentProps<typeof HeroTimeField>>) {
  return <HeroTimeField {...props} />
}

const TimeField = Object.assign(LocalTimeField, {
  Root: LocalTimeField,
})

export default TimeField

