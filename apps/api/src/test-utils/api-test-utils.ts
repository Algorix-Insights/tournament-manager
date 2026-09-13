import type { AddressInfo, Server } from 'node:net';
import { afterAll, beforeAll, beforeEach, jest } from '@jest/globals';
import type { Express } from 'express';
import { prisma } from '@/core/prisma';

type MockMethod = jest.Mock<(...args: any[]) => any>;
type MockDatabase = {
  player: Record<string, MockMethod>;
  genre: Record<string, MockMethod>;
  game: Record<string, MockMethod>;
  score: Record<string, MockMethod>;
};

export const database = prisma as unknown as MockDatabase;

export function resetDatabaseMocks(): void {
  jest.clearAllMocks();

  for (const module of Object.values(database)) {
    for (const method of Object.values(module)) {
      method.mockResolvedValue([]);
    }
  }

  database.player.count.mockResolvedValue(0);
  database.genre.count.mockResolvedValue(0);
  database.game.count.mockResolvedValue(0);
  database.score.count.mockResolvedValue(0);
  database.score.aggregate.mockResolvedValue({ _avg: { score: null } });
  database.player.findUnique.mockResolvedValue(null);
  database.genre.findUnique.mockResolvedValue(null);
  database.game.findUnique.mockResolvedValue(null);
}

async function startServer(app: Express): Promise<Server> {
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  return server;
}

async function stopServer(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function request(
  server: Server,
  path: string,
  method = 'GET',
  body?: unknown,
): Promise<Response> {
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Test server did not bind to TCP');
  }

  const options: RequestInit = {
    method,
    headers: { 'content-type': 'application/json' },
  };
  if (body !== undefined) options.body = JSON.stringify(body);

  return fetch(`http://127.0.0.1:${(address as AddressInfo).port}${path}`, options);
}

export async function readJson(response: Response): Promise<Record<string, any>> {
  return response.json() as Promise<Record<string, any>>;
}

export function setupApiTest(app: Express): {
  request: (path: string, method?: string, body?: unknown) => Promise<Response>;
} {
  let server!: Server;
  let consoleError: jest.Spied<typeof console.error>;

  beforeAll(async () => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    server = await startServer(app);
  });

  beforeEach(resetDatabaseMocks);

  afterAll(async () => {
    consoleError.mockRestore();
    await stopServer(server);
  });

  return { request: (path, method, body) => request(server, path, method, body) };
}
