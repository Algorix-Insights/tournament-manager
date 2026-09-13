import { CloseButton as HeroCloseButton } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalCloseButton(props: Readonly<ComponentProps<typeof HeroCloseButton>>) {
  return <HeroCloseButton {...props} />
}

const CloseButton = Object.assign(LocalCloseButton, {
  Root: LocalCloseButton,
})

export default CloseButton

