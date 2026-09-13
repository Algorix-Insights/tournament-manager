import { Skeleton as HeroSkeleton } from '@heroui/react'
import type { ComponentProps } from 'react'

function LocalSkeleton(props: Readonly<ComponentProps<typeof HeroSkeleton>>) {
  return <HeroSkeleton {...props} />
}

const Skeleton = Object.assign(LocalSkeleton, {
  Root: LocalSkeleton,
})

export default Skeleton

