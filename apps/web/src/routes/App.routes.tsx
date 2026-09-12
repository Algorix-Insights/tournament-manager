import { Navigate, Route, Routes } from 'react-router'
import App from '@/app/App'
import DashboardRoutes from '@/routes/dashboard.routes'
import GamesRoutes from '@/routes/games.routes'
import PlayersRoutes from '@/routes/players.routes'
import ScoresRoutes from '@/routes/scores.routes'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/players/*" element={<PlayersRoutes />} />
      <Route path="/games/*" element={<GamesRoutes />} />
      <Route path="/scores/*" element={<ScoresRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
