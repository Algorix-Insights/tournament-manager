import { Paragraph as HeroParagraph } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function Paragraph(props: Readonly<ComponentProps<typeof HeroParagraph>>) {
  return <HeroParagraph {...props} />
}

