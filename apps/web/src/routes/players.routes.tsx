import { Route, Routes } from 'react-router'
import PlayersPage from '@/features/players/pages/PlayersPage'

export default function PlayersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PlayersPage />} />
    </Routes>
  )
}
