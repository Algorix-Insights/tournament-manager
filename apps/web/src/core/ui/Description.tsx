import { Description as HeroDescription } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalDescription(props: Readonly<ComponentProps<typeof HeroDescription>>) {
  return <HeroDescription {...props} />
}

const Description = Object.assign(LocalDescription, {
  Root: LocalDescription,
})

export default Description

