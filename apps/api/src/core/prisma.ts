import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb(
  process.env.DATABASE_URL ?? 'mysql://root:password@localhost:3306/tournament_db'
);

export const prisma = new PrismaClient({ adapter });
