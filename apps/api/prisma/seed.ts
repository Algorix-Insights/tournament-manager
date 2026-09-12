import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la siembra de datos (seed) en la base de datos MySQL...');

  // 1. Limpiar datos existentes
  await prisma.puntuacion.deleteMany();
  await prisma.jugador.deleteMany();
  await prisma.videojuego.deleteMany();
  await prisma.genero.deleteMany();

  // 2. Crear Géneros del Catálogo
  const peleas = await prisma.genero.create({
    data: { nombre: 'Peleas' },
  });
  const shooter = await prisma.genero.create({
    data: { nombre: 'Shooter' },
  });
  const deportes = await prisma.genero.create({
    data: { nombre: 'Deportes' },
  });
  console.log('✅ Géneros creados.');

  // 3. Crear Jugadores
  const shadow = await prisma.jugador.create({
    data: {
      nombre: 'Carlos Mendoza',
      gamertag: 'Shadow',
      correo: 'shadow@example.com',
    },
  });

  const nova = await prisma.jugador.create({
    data: {
      nombre: 'Valeria Gómez',
      gamertag: 'Nova',
      correo: 'nova@example.com',
    },
  });

  const ghost = await prisma.jugador.create({
    data: {
      nombre: 'Gabriel Torres',
      gamertag: 'Ghost',
      correo: 'ghost@example.com',
    },
  });

  const apex = await prisma.jugador.create({
    data: {
      nombre: 'Ana Martínez',
      gamertag: 'Apex',
      correo: 'apex@example.com',
    },
  });

  const titan = await prisma.jugador.create({
    data: {
      nombre: 'Luis Hernández',
      gamertag: 'Titan',
      correo: 'titan@example.com',
    },
  });

  console.log('✅ Jugadores creados.');

  // 4. Crear Videojuegos
  const tekken = await prisma.videojuego.create({
    data: {
      nombre: 'Tekken 8',
      generoId: peleas.id,
    },
  });

  const sf6 = await prisma.videojuego.create({
    data: {
      nombre: 'Street Fighter 6',
      generoId: peleas.id,
    },
  });

  const smash = await prisma.videojuego.create({
    data: {
      nombre: 'Super Smash Bros. Ultimate',
      generoId: peleas.id,
    },
  });

  const halo = await prisma.videojuego.create({
    data: {
      nombre: 'Halo Infinite',
      generoId: shooter.id,
    },
  });

  await prisma.videojuego.create({
    data: {
      nombre: 'FIFA 24',
      generoId: deportes.id,
    },
  });

  console.log('✅ Videojuegos creados.');

  // 4. Crear Puntuaciones
  await prisma.puntuacion.createMany({
    data: [
      { jugadorId: shadow.id, videojuegoId: smash.id, puntuacion: 990 },
      { jugadorId: shadow.id, videojuegoId: tekken.id, puntuacion: 950 },
      { jugadorId: titan.id, videojuegoId: halo.id, puntuacion: 910 },
      { jugadorId: apex.id, videojuegoId: sf6.id, puntuacion: 890 },
      { jugadorId: nova.id, videojuegoId: tekken.id, puntuacion: 820 },
      { jugadorId: ghost.id, videojuegoId: tekken.id, puntuacion: 760 },
      { jugadorId: nova.id, videojuegoId: sf6.id, puntuacion: 750 },
    ],
  });

  console.log('✅ Puntuaciones iniciales registradas.');
  console.log('🎉 Siembra de datos completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error sembrando datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
