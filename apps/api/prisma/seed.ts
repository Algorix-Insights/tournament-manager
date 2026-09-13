import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { normalizePublicGames, type PublicGame } from '../src/core/utils/public-games.util';

const PUBLIC_GAMES_URL = 'https://www.freetogame.com/api/games';

const adapter = new PrismaMariaDb(
  process.env.DATABASE_URL!
);
const prisma = new PrismaClient({ adapter });

async function fetchPublicGames(): Promise<PublicGame[]> {
  const response = await fetch(PUBLIC_GAMES_URL, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`FreeToGame API request failed with status ${response.status}`);
  }

  const games = normalizePublicGames(await response.json());
  if (games.length === 0) {
    throw new Error('FreeToGame API returned no valid games');
  }

  return games;
}

async function main() {
  console.log('🌱 Starting database seeding in MySQL...');

  const publicGames = await fetchPublicGames();
  console.log(`📚 ${publicGames.length} games fetched from ${PUBLIC_GAMES_URL}`);

  // 1. Clear existing data
  await prisma.score.deleteMany();
  await prisma.player.deleteMany();
  await prisma.game.deleteMany();
  await prisma.genre.deleteMany();

  // 2. Create the genres from the public catalog
  const genreNames = [
    ...new Map(publicGames.map((game) => [game.genre.toLowerCase(), game.genre])).values(),
  ];
  await prisma.genre.createMany({
    data: genreNames.map((name) => ({ name })),
  });
  const genres = await prisma.genre.findMany({
    where: { name: { in: genreNames } },
    select: { id: true, name: true },
  });
  const genreIds = new Map(genres.map((genre) => [genre.name.toLowerCase(), genre.id]));
  console.log('✅ Genres created.');

  // 3. Create Players
  const shadow = await prisma.player.create({
    data: {
      name: 'Carlos Mendoza',
      gamertag: 'Shadow',
      email: 'shadow@example.com',
    },
  });

  const nova = await prisma.player.create({
    data: {
      name: 'Valeria Gómez',
      gamertag: 'Nova',
      email: 'nova@example.com',
    },
  });

  const ghost = await prisma.player.create({
    data: {
      name: 'Gabriel Torres',
      gamertag: 'Ghost',
      email: 'ghost@example.com',
    },
  });

  const apex = await prisma.player.create({
    data: {
      name: 'Ana Martínez',
      gamertag: 'Apex',
      email: 'apex@example.com',
    },
  });

  const titan = await prisma.player.create({
    data: {
      name: 'Luis Hernández',
      gamertag: 'Titan',
      email: 'titan@example.com',
    },
  });

  console.log('✅ Players created.');

  // 4. Create games from the public catalog
  await prisma.game.createMany({
    data: publicGames.map((game) => ({
      name: game.title,
      genreId: genreIds.get(game.genre.toLowerCase())!,
    })),
  });
  const createdGames = await prisma.game.findMany({
    where: { name: { in: publicGames.map((game) => game.title) } },
    select: { id: true, name: true },
  });
  const gameIds = new Map(createdGames.map((game) => [game.name, game.id]));
  const games = publicGames.map((game) => ({ id: gameIds.get(game.title)! }));

  console.log(`✅ ${games.length} games created.`);

  // 5. Create Scores
  const players = [shadow, nova, ghost, apex, titan];
  await prisma.score.createMany({
    data: games.slice(0, 7).map((game, index) => ({
      playerId: players[index % players.length].id,
      gameId: game.id,
      score: 990 - index * 30,
    })),
  });

  console.log('✅ Initial scores registered.');
  console.log('🎉 Data seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
