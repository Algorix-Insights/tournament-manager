import { FieldError as HeroFieldError } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalFieldError(props: Readonly<ComponentProps<typeof HeroFieldError>>) {
  return <HeroFieldError {...props} />
}

const FieldError = Object.assign(LocalFieldError, {
  Root: LocalFieldError,
})

export default FieldError

