import { Route, Routes } from 'react-router'
import ScoresPage from '@/features/scores/pages/ScoresPage'

export default function ScoresRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ScoresPage />} />
    </Routes>
  )
}
