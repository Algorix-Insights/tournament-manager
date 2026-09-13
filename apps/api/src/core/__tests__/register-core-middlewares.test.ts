import express from 'express';
import { expect, test } from '@jest/globals';
import { registerCoreMiddlewares } from '@/core/middlewares/register-core-middlewares';

test('registers core middlewares before the application routes', async () => {
  const app = express();
  registerCoreMiddlewares(app);
  app.get('/filters', (_req, res) => res.json(res.locals.filters));

  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  try {
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Server did not bind to TCP');

    const response = await fetch(
      `http://127.0.0.1:${address.port}/filters?genreId=7&name=%20Zelda%20&nombre=Legacy`,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ genreId: 7, name: 'Zelda' });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
