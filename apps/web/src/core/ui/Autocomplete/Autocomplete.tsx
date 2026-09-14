import { Autocomplete as HeroAutocomplete } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Autocomplete/Root'
import Trigger from '@/core/ui/Autocomplete/Trigger'
import Value from '@/core/ui/Autocomplete/Value'
import Indicator from '@/core/ui/Autocomplete/Indicator'
import Popover from '@/core/ui/Autocomplete/Popover'
import Filter from '@/core/ui/Autocomplete/Filter'
import ClearButton from '@/core/ui/Autocomplete/ClearButton'

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

