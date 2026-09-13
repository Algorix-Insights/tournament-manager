export interface PublicGame {
  title: string;
  genre: string;
}

export function normalizePublicGames(payload: unknown): PublicGame[] {
  if (!Array.isArray(payload)) return [];

  const games = new Map<string, PublicGame>();

  for (const item of payload) {
    if (typeof item !== 'object' || item === null) continue;

    const title = 'title' in item && typeof item.title === 'string' ? item.title.trim() : '';
    const genre = 'genre' in item && typeof item.genre === 'string' ? item.genre.trim() : '';

    if (!title || !genre || title.length > 100 || genre.length > 50) continue;

    const key = title.toLowerCase();
    if (!games.has(key)) games.set(key, { title, genre });
  }

  return [...games.values()];
}
