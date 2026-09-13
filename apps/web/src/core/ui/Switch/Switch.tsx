import { Switch as HeroSwitch } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Content from './Content'
import Control from './Control'
import Thumb from './Thumb'
import Icon from './Icon'

function LocalSwitch(props: Readonly<ComponentProps<typeof HeroSwitch>>) {
  return <HeroSwitch {...props} />
}

const Switch = Object.assign(LocalSwitch, {
  Root: Root,
  Content: Content,
  Control: Control,
  Thumb: Thumb,
  Icon: Icon,
})

export default Switch

