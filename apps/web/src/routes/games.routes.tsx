import { Route, Routes } from 'react-router'
import GamesPage from '@/features/games/pages/GamesPage'

export default function GamesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GamesPage />} />
    </Routes>
  )
}
