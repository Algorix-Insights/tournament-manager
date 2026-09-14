import { Typography as HeroTypography } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Typography/Root'
import Code from '@/core/ui/Typography/Code'
import Heading from '@/core/ui/Typography/Heading'
import Paragraph from '@/core/ui/Typography/Paragraph'
import Prose from '@/core/ui/Typography/Prose'

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

