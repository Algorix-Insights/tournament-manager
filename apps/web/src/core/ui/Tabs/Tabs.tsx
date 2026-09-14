import { Tabs as HeroTabs } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Tabs/Root'
import ListContainer from '@/core/ui/Tabs/ListContainer'
import List from '@/core/ui/Tabs/List'
import Tab from '@/core/ui/Tabs/Tab'
import Indicator from '@/core/ui/Tabs/Indicator'
import Separator from '@/core/ui/Tabs/Separator'
import Panel from '@/core/ui/Tabs/Panel'

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

