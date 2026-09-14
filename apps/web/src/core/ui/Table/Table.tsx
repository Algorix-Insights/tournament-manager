import { Table as HeroTable } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Table/Root'
import ScrollContainer from '@/core/ui/Table/ScrollContainer'
import Content from '@/core/ui/Table/Content'
import Header from '@/core/ui/Table/Header'
import Column from '@/core/ui/Table/Column'
import ColumnResizer from '@/core/ui/Table/ColumnResizer'
import Body from '@/core/ui/Table/Body'
import Row from '@/core/ui/Table/Row'
import Cell from '@/core/ui/Table/Cell'
import Footer from '@/core/ui/Table/Footer'
import LoadMore from '@/core/ui/Table/LoadMore'
import LoadMoreContent from '@/core/ui/Table/LoadMoreContent'
import ResizableContainer from '@/core/ui/Table/ResizableContainer'
import SortableColumnHeader from '@/core/ui/Table/SortableColumnHeader'

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

