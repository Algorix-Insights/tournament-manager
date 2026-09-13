import { TabPanel as HeroTabPanel } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function TabPanel(props: Readonly<ComponentProps<typeof HeroTabPanel>>) {
  return <HeroTabPanel {...props} />
}

