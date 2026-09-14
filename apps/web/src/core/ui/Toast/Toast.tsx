import { Toast as HeroToast } from '@heroui/react'
import type { ComponentProps } from 'react'
import Provider from '@/core/ui/Toast/Provider'
import Content from '@/core/ui/Toast/Content'
import Indicator from '@/core/ui/Toast/Indicator'
import Title from '@/core/ui/Toast/Title'
import Description from '@/core/ui/Toast/Description'
import ActionButton from '@/core/ui/Toast/ActionButton'
import CloseButton from '@/core/ui/Toast/CloseButton'

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

