import { Card as HeroCard } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Card/Root'
import Header from '@/core/ui/Card/Header'
import Title from '@/core/ui/Card/Title'
import Description from '@/core/ui/Card/Description'
import Content from '@/core/ui/Card/Content'
import Footer from '@/core/ui/Card/Footer'

function LocalCard(props: Readonly<ComponentProps<typeof HeroCard>>) {
  return <HeroCard {...props} />
}

const Card = Object.assign(LocalCard, {
  Root: Root,
  Header: Header,
  Title: Title,
  Description: Description,
  Content: Content,
  Footer: Footer,
})

export default Card

