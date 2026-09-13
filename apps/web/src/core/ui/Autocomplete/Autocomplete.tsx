import { Autocomplete as HeroAutocomplete } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Trigger from './Trigger'
import Value from './Value'
import Indicator from './Indicator'
import Popover from './Popover'
import Filter from './Filter'
import ClearButton from './ClearButton'

function LocalAutocomplete(props: Readonly<ComponentProps<typeof HeroAutocomplete>>) {
  return <HeroAutocomplete {...props} />
}

const Autocomplete = Object.assign(LocalAutocomplete, {
  Root: Root,
  Trigger: Trigger,
  Value: Value,
  Indicator: Indicator,
  Popover: Popover,
  Filter: Filter,
  ClearButton: ClearButton,
})

export default Autocomplete

