import { DateField as HeroDateField } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalDateField(props: Readonly<ComponentProps<typeof HeroDateField>>) {
  return <HeroDateField {...props} />
}

const DateField = Object.assign(LocalDateField, {
  Root: LocalDateField,
})

export default DateField

