export interface CreatePlayerDTO {
  name: string;
  gamertag: string;
  email: string;
}

export interface UpdatePlayerDTO {
  name?: string;
  gamertag?: string;
  email?: string;
}

export interface PlayerFilterDTO {
  name?: string;
  gamertag?: string;
  email?: string;
  search?: string;
  period?: number;
  startDate?: string;
  endDate?: string;
  order?: string;
  page?: number;
  limit?: number;
}
