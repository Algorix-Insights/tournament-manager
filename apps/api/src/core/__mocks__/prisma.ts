import { jest } from '@jest/globals';

const model = () => ({
  findMany: jest.fn(),
  count: jest.fn(),
  findUnique: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

export const prisma = {
  player: model(),
  genre: model(),
  game: model(),
  score: {
    ...model(),
    aggregate: jest.fn(),
  },
};
