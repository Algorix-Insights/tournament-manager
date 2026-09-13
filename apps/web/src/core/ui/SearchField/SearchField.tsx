import { SearchField as HeroSearchField } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Group from './Group'
import Input from './Input'
import SearchIcon from './SearchIcon'
import ClearButton from './ClearButton'

function LocalSearchField(props: Readonly<ComponentProps<typeof HeroSearchField>>) {
  return <HeroSearchField {...props} />
}

const SearchField = Object.assign(LocalSearchField, {
  Root: Root,
  Group: Group,
  Input: Input,
  SearchIcon: SearchIcon,
  ClearButton: ClearButton,
})

export default SearchField

