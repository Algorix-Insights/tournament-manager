import { Card as HeroCard } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Header from './Header'
import Title from './Title'
import Description from './Description'
import Content from './Content'
import Footer from './Footer'

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

