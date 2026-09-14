import { Calendar as HeroCalendar } from '@heroui/react'
import type { ComponentProps } from 'react'
import Root from '@/core/ui/Calendar/Root'
import Header from '@/core/ui/Calendar/Header'
import Heading from '@/core/ui/Calendar/Heading'
import NavButton from '@/core/ui/Calendar/NavButton'
import Grid from '@/core/ui/Calendar/Grid'
import GridHeader from '@/core/ui/Calendar/GridHeader'
import GridBody from '@/core/ui/Calendar/GridBody'
import HeaderCell from '@/core/ui/Calendar/HeaderCell'
import Cell from '@/core/ui/Calendar/Cell'
import CellIndicator from '@/core/ui/Calendar/CellIndicator'
import YearPickerTrigger from '@/core/ui/Calendar/YearPickerTrigger'
import YearPickerTriggerHeading from '@/core/ui/Calendar/YearPickerTriggerHeading'
import YearPickerTriggerIndicator from '@/core/ui/Calendar/YearPickerTriggerIndicator'
import YearPickerGrid from '@/core/ui/Calendar/YearPickerGrid'
import YearPickerGridBody from '@/core/ui/Calendar/YearPickerGridBody'
import YearPickerCell from '@/core/ui/Calendar/YearPickerCell'

function LocalCalendar(props: Readonly<ComponentProps<typeof HeroCalendar>>) {
  return <HeroCalendar {...props} />
}

const Calendar = Object.assign(LocalCalendar, {
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

export default Calendar

