import { DrawerDialog as HeroDrawerDialog } from '@heroui/react'
import type { ComponentProps } from 'react'

export default function DrawerDialog(props: Readonly<ComponentProps<typeof HeroDrawerDialog>>) {
  return <HeroDrawerDialog {...props} />
}

