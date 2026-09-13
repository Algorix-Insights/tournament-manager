import { Fieldset as HeroFieldset } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Legend from './Legend'
import Group from './Group'
import Actions from './Actions'

function LocalFieldset(props: Readonly<ComponentProps<typeof HeroFieldset>>) {
  return <HeroFieldset {...props} />
}

const Fieldset = Object.assign(LocalFieldset, {
  Root: Root,
  Legend: Legend,
  Group: Group,
  Actions: Actions,
})

export default Fieldset

