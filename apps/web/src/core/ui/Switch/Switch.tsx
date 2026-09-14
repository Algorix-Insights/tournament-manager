import { Switch as HeroSwitch } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Switch/Root'
import Content from '@/core/ui/Switch/Content'
import Control from '@/core/ui/Switch/Control'
import Thumb from '@/core/ui/Switch/Thumb'
import Icon from '@/core/ui/Switch/Icon'

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

