export interface GameGenre {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  genreId: number;
  genre: GameGenre;
}

export interface GamesResponse {
  data: Game[];
  totalRecords: number;
}

export interface GenresResponse {
  data: GameGenre[];
  totalRecords: number;
}

export interface GameInput {
  name: string;
  genreId: number;
}
