import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(
  process.env.DATABASE_URL!
);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding in MySQL...');

  // 1. Clear existing data
  await prisma.score.deleteMany();
  await prisma.player.deleteMany();
  await prisma.game.deleteMany();
  await prisma.genre.deleteMany();

  // 2. Create Genres Catalog
  const fighting = await prisma.genre.create({
    data: { name: 'Fighting' },
  });
  const shooter = await prisma.genre.create({
    data: { name: 'Shooter' },
  });
  const sports = await prisma.genre.create({
    data: { name: 'Sports' },
  });
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

  // 4. Create Games
  const tekken = await prisma.game.create({
    data: {
      name: 'Tekken 8',
      genreId: fighting.id,
    },
  });

  const sf6 = await prisma.game.create({
    data: {
      name: 'Street Fighter 6',
      genreId: fighting.id,
    },
  });

  const smash = await prisma.game.create({
    data: {
      name: 'Super Smash Bros. Ultimate',
      genreId: fighting.id,
    },
  });

  const halo = await prisma.game.create({
    data: {
      name: 'Halo Infinite',
      genreId: shooter.id,
    },
  });

  await prisma.game.create({
    data: {
      name: 'FIFA 24',
      genreId: sports.id,
    },
  });

  console.log('✅ Games created.');

  // 5. Create Scores
  await prisma.score.createMany({
    data: [
      { playerId: shadow.id, gameId: smash.id, score: 990 },
      { playerId: shadow.id, gameId: tekken.id, score: 950 },
      { playerId: titan.id, gameId: halo.id, score: 910 },
      { playerId: apex.id, gameId: sf6.id, score: 890 },
      { playerId: nova.id, gameId: tekken.id, score: 820 },
      { playerId: ghost.id, gameId: tekken.id, score: 760 },
      { playerId: nova.id, gameId: sf6.id, score: 750 },
    ],
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
