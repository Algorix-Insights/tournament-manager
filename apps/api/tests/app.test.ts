import app from '../src/server';
import { expect, test } from '@jest/globals';

test('GET / returns API welcome info', async () => {
  const server = app.listen(0, '127.0.0.1');

  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  try {
    const address = server.address();

    if (!address || typeof address === 'string') {
      throw new Error('Server did not bind to TCP');
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/`);

    expect(response.status).toBe(200);
    expect(response.headers.get('x-powered-by')).toBeNull();

    const data = await response.json();
    expect(data.message).toBe('Tournament Manager API ready');
    expect(data.endpoints.players).toBe('/api/players');
    expect(data.endpoints.games).toBe('/api/games');
    expect(data.endpoints.scores).toBe('/api/scores');
    expect(data.endpoints.genres).toBe('/api/genres');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
