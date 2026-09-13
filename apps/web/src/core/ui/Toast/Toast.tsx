import { Toast as HeroToast } from '@heroui/react'
import type { ComponentProps } from 'react'
import Provider from './Provider'
import Content from './Content'
import Indicator from './Indicator'
import Title from './Title'
import Description from './Description'
import ActionButton from './ActionButton'
import CloseButton from './CloseButton'

function LocalToast(props: Readonly<ComponentProps<typeof HeroToast>>) {
  return <HeroToast {...props} />
}

const Toast = Object.assign(LocalToast, {
  Provider: Provider,
  Content: Content,
  Indicator: Indicator,
  Title: Title,
  Description: Description,
  ActionButton: ActionButton,
  CloseButton: CloseButton,
})

export default Toast

