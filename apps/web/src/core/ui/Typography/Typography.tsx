import { Typography as HeroTypography } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Code from './Code'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Prose from './Prose'

function LocalTypography(props: Readonly<ComponentProps<typeof HeroTypography>>) {
  return <HeroTypography {...props} />
}

const Typography = Object.assign(LocalTypography, {
  Root: Root,
  Code: Code,
  Heading: Heading,
  Paragraph: Paragraph,
  Prose: Prose,
})

export default Typography

