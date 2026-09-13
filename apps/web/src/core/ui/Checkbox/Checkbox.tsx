import { Checkbox as HeroCheckbox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Content from './Content'
import Control from './Control'
import Indicator from './Indicator'

function LocalCheckbox(props: Readonly<ComponentProps<typeof HeroCheckbox>>) {
  return <HeroCheckbox {...props} />
}

const Checkbox = Object.assign(LocalCheckbox, {
  Root: Root,
  Content: Content,
  Control: Control,
  Indicator: Indicator,
})

export default Checkbox

