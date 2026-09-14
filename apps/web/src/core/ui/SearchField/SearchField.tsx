import { SearchField as HeroSearchField } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/SearchField/Root'
import Group from '@/core/ui/SearchField/Group'
import Input from '@/core/ui/SearchField/Input'
import SearchIcon from '@/core/ui/SearchField/SearchIcon'
import ClearButton from '@/core/ui/SearchField/ClearButton'

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

