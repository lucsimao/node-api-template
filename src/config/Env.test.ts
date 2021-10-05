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
        address: 'localhost',
        database: 'test',
        password: 'my password',
        port: '27017',
        ssl: 'false',
        username: 'root',
      },
      logger: { enabled: false },
      port: 3333,
    });
  });
});
