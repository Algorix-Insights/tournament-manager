import { Route, Routes } from 'react-router'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  )
}
