import { jest } from '@jest/globals';

jest.mock('@scalar/express-api-reference', () => ({
  apiReference: () => (_request: unknown, response: { type: (value: string) => { send: (html: string) => void } }) => {
    response.type('html').send('<!doctype html><html><body>Scalar API Reference</body></html>');
  },
}));
