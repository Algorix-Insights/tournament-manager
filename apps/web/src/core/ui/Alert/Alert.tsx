import { Alert as HeroAlert } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Indicator from './Indicator'
import Content from './Content'
import Title from './Title'
import Description from './Description'

function LocalAlert(props: Readonly<ComponentProps<typeof HeroAlert>>) {
  return <HeroAlert {...props} />
}

const Alert = Object.assign(LocalAlert, {
  Root: Root,
  Indicator: Indicator,
  Content: Content,
  Title: Title,
  Description: Description,
})

export default Alert

