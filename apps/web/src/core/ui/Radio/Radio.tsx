import { Radio as HeroRadio } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Radio/Root'
import Content from '@/core/ui/Radio/Content'
import Control from '@/core/ui/Radio/Control'
import Indicator from '@/core/ui/Radio/Indicator'

function LocalRadio(props: Readonly<ComponentProps<typeof HeroRadio>>) {
  return <HeroRadio {...props} />
}

const Radio = Object.assign(LocalRadio, {
  Root: Root,
  Content: Content,
  Control: Control,
  Indicator: Indicator,
})

export default Radio

