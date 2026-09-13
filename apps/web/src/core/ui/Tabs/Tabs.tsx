import { Tabs as HeroTabs } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import ListContainer from './ListContainer'
import List from './List'
import Tab from './Tab'
import Indicator from './Indicator'
import Separator from './Separator'
import Panel from './Panel'

function LocalTabs(props: Readonly<ComponentProps<typeof HeroTabs>>) {
  return <HeroTabs {...props} />
}

const Tabs = Object.assign(LocalTabs, {
  Root: Root,
  ListContainer: ListContainer,
  List: List,
  Tab: Tab,
  Indicator: Indicator,
  Separator: Separator,
  Panel: Panel,
})

export default Tabs

