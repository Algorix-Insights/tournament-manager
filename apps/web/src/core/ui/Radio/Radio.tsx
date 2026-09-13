import { Radio as HeroRadio } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Content from './Content'
import Control from './Control'
import Indicator from './Indicator'

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

