import { RangeCalendar as HeroRangeCalendar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from './Root'
import Header from './Header'
import Heading from './Heading'
import NavButton from './NavButton'
import Grid from './Grid'
import GridHeader from './GridHeader'
import GridBody from './GridBody'
import HeaderCell from './HeaderCell'
import Cell from './Cell'
import CellIndicator from './CellIndicator'
import YearPickerTrigger from './YearPickerTrigger'
import YearPickerTriggerHeading from './YearPickerTriggerHeading'
import YearPickerTriggerIndicator from './YearPickerTriggerIndicator'
import YearPickerGrid from './YearPickerGrid'
import YearPickerGridBody from './YearPickerGridBody'
import YearPickerCell from './YearPickerCell'

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

