import { Card } from '@heroui/react'
import GamesPage from '@/features/games/pages/GamesPage'
import PlayersPage from '@/features/players/pages/PlayersPage'
import ScoresPage from '@/features/scores/pages/ScoresPage'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Tournament Manager</h1>
        <Card className="mt-10">
          <Card.Content className="grid gap-6 md:grid-cols-3">
            <PlayersPage />
            <GamesPage />
            <ScoresPage />
          </Card.Content>
        </Card>
      </div>
    </main>
  )
}
