import { ErrorMessage as HeroErrorMessage } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalErrorMessage(props: Readonly<ComponentProps<typeof HeroErrorMessage>>) {
  return <HeroErrorMessage {...props} />
}

const ErrorMessage = Object.assign(LocalErrorMessage, {
  Root: LocalErrorMessage,
})

export default ErrorMessage

