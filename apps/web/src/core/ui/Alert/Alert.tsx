import { Alert as HeroAlert } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Alert/Root'
import Indicator from '@/core/ui/Alert/Indicator'
import Content from '@/core/ui/Alert/Content'
import Title from '@/core/ui/Alert/Title'
import Description from '@/core/ui/Alert/Description'

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

