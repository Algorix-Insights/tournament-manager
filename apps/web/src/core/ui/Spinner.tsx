import { Spinner as HeroSpinner } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalSpinner(props: Readonly<ComponentProps<typeof HeroSpinner>>) {
  return <HeroSpinner {...props} />
}

const Spinner = Object.assign(LocalSpinner, {
  Root: LocalSpinner,
})

export default Spinner

