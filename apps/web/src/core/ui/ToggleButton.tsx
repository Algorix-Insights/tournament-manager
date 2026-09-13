import { ToggleButton as HeroToggleButton } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalToggleButton(props: Readonly<ComponentProps<typeof HeroToggleButton>>) {
  return <HeroToggleButton {...props} />
}

const ToggleButton = Object.assign(LocalToggleButton, {
  Root: LocalToggleButton,
})

export default ToggleButton

