import { Table as HeroTable } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import ScrollContainer from './ScrollContainer'
import Content from './Content'
import Header from './Header'
import Column from './Column'
import ColumnResizer from './ColumnResizer'
import Body from './Body'
import Row from './Row'
import Cell from './Cell'
import Footer from './Footer'
import LoadMore from './LoadMore'
import LoadMoreContent from './LoadMoreContent'
import ResizableContainer from './ResizableContainer'
import SortableColumnHeader from './SortableColumnHeader'

function LocalTable(props: Readonly<ComponentProps<typeof HeroTable>>) {
  return <HeroTable {...props} />
}

const Table = Object.assign(LocalTable, {
  Root: Root,
  ScrollContainer: ScrollContainer,
  Content: Content,
  Header: Header,
  Column: Column,
  ColumnResizer: ColumnResizer,
  Body: Body,
  Row: Row,
  Cell: Cell,
  Footer: Footer,
  LoadMore: LoadMore,
  LoadMoreContent: LoadMoreContent,
  ResizableContainer: ResizableContainer,
  SortableColumnHeader: SortableColumnHeader,
})

export default Table

