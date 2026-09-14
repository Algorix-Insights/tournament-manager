import { Navigate, Route, Routes } from 'react-router'
import App from '@/app/App'
import AppLayout from '@/app/AppLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import GamesPage from '@/features/games/pages/GamesPage'
import PlayersPage from '@/features/players/pages/PlayersPage'
import ScoresPage from '@/features/scores/pages/ScoresPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
