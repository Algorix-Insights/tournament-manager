export interface Player {
  id: number;
  name: string;
  gamertag: string;
  email: string;
  createdAt: string;
}

export interface PlayerScore {
  id: number;
  gameId: number;
  score: number;
  createdAt: string;
  game: {
    id: number;
    name: string;
    genre: { id: number; name: string };
  };
}

export interface PlayerDetail extends Player {
  scores: PlayerScore[];
}

export interface PlayersResponse {
  data: Player[];
  totalRecords: number;
}

export interface PlayerInput {
  name: string;
  gamertag: string;
  email: string;
}
