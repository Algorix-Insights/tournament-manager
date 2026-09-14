import { Fieldset as HeroFieldset } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Fieldset/Root'
import Legend from '@/core/ui/Fieldset/Legend'
import Group from '@/core/ui/Fieldset/Group'
import Actions from '@/core/ui/Fieldset/Actions'

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

