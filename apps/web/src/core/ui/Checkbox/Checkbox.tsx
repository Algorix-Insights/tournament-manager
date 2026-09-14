import { Checkbox as HeroCheckbox } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Checkbox/Root'
import Content from '@/core/ui/Checkbox/Content'
import Control from '@/core/ui/Checkbox/Control'
import Indicator from '@/core/ui/Checkbox/Indicator'

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

