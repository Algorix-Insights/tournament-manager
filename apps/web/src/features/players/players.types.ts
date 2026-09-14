export interface Player {
  id: number;
  name: string;
  gamertag: string;
  email: string;
  createdAt: string;
}

export interface PlayersResponse {
  data: Player[];
  totalRecords: number;
}