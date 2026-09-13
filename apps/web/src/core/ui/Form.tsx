import { Form as HeroForm } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalForm(props: Readonly<ComponentProps<typeof HeroForm>>) {
  return <HeroForm {...props} />
}

const Form = Object.assign(LocalForm, {
  Root: LocalForm,
})

export default Form

