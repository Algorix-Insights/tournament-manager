import { Toolbar as HeroToolbar } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalToolbar(props: Readonly<ComponentProps<typeof HeroToolbar>>) {
  return <HeroToolbar {...props} />
}

const Toolbar = Object.assign(LocalToolbar, {
  Root: LocalToolbar,
})

export default Toolbar

