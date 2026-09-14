import { RangeCalendar as HeroRangeCalendar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/RangeCalendar/Root'
import Header from '@/core/ui/RangeCalendar/Header'
import Heading from '@/core/ui/RangeCalendar/Heading'
import NavButton from '@/core/ui/RangeCalendar/NavButton'
import Grid from '@/core/ui/RangeCalendar/Grid'
import GridHeader from '@/core/ui/RangeCalendar/GridHeader'
import GridBody from '@/core/ui/RangeCalendar/GridBody'
import HeaderCell from '@/core/ui/RangeCalendar/HeaderCell'
import Cell from '@/core/ui/RangeCalendar/Cell'
import CellIndicator from '@/core/ui/RangeCalendar/CellIndicator'
import YearPickerTrigger from '@/core/ui/RangeCalendar/YearPickerTrigger'
import YearPickerTriggerHeading from '@/core/ui/RangeCalendar/YearPickerTriggerHeading'
import YearPickerTriggerIndicator from '@/core/ui/RangeCalendar/YearPickerTriggerIndicator'
import YearPickerGrid from '@/core/ui/RangeCalendar/YearPickerGrid'
import YearPickerGridBody from '@/core/ui/RangeCalendar/YearPickerGridBody'
import YearPickerCell from '@/core/ui/RangeCalendar/YearPickerCell'

function LocalRangeCalendar(props: Readonly<ComponentProps<typeof HeroRangeCalendar>>) {
  return <HeroRangeCalendar {...props} />
}

const RangeCalendar = Object.assign(LocalRangeCalendar, {
  Root: Root,
  Header: Header,
  Heading: Heading,
  NavButton: NavButton,
  Grid: Grid,
  GridHeader: GridHeader,
  GridBody: GridBody,
  HeaderCell: HeaderCell,
  Cell: Cell,
  CellIndicator: CellIndicator,
  YearPickerTrigger: YearPickerTrigger,
  YearPickerTriggerHeading: YearPickerTriggerHeading,
  YearPickerTriggerIndicator: YearPickerTriggerIndicator,
  YearPickerGrid: YearPickerGrid,
  YearPickerGridBody: YearPickerGridBody,
  YearPickerCell: YearPickerCell,
})

export default RangeCalendar

