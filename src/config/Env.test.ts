/* eslint-disable @typescript-eslint/no-explicit-any */
import env from './Env';

describe('Env tests', () => {
  it('should return env when called', () => {
    (env as any).appEnvs = undefined;

    const app = env.app;
    expect(app).toEqual({
      auth: { expiration: '30m', secret: 'secret' },
      cryptography: { salt: 10 },
      database: {
        address: process.env.DATABASE_ADDRESS,
        database: 'test',
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        ssl: 'false',
        username: process.env.DATABASE_USERNAME,
      },
      logger: {
        elasticSearch: {
          port: 9200,
          url: 'elasticsearch',
          version: '7.x',
        },
        options: [''],
      },
      port: 3333,
      rateLimiter: {
        maxInterval: 60000,
        maxRequests: 10,
      },
    });
  });
});
