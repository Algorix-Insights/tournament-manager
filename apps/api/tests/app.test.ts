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
    expect(data.endpoints.players).toBe('/api/v1/players');
    expect(data.endpoints.games).toBe('/api/v1/games');
    expect(data.endpoints.scores).toBe('/api/v1/scores');
    expect(data.endpoints.genres).toBe('/api/v1/genres');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('serves the OpenAPI contract and Scalar documentation', async () => {
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

    const baseUrl = `http://127.0.0.1:${address.port}`;
    const openApiResponse = await fetch(`${baseUrl}/openapi.json`);
    expect(openApiResponse.status).toBe(200);

    const openApi = await openApiResponse.json();
    expect(openApi.openapi).toBe('3.0.3');
    expect(openApi.info.title).toBe('Tournament Manager API');
    expect(openApi.paths['/api/v1/players']).toBeDefined();
    expect(openApi.paths['/api/v1/scores/ranking']).toBeDefined();
    expect(openApi.components.schemas.PaginatedPlayers.properties.ROW_COUNT).toBeUndefined();
    expect(openApi.components.schemas.PaginatedPlayers.properties.totalRecords).toBeDefined();

    const docsResponse = await fetch(`${baseUrl}/docs`);
    expect(docsResponse.status).toBe(200);
    expect(docsResponse.headers.get('content-type')).toContain('text/html');
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
