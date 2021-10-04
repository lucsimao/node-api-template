interface IAppEnv {
  port: number;
  logger: { enabled: boolean };
  database: {
    address: string;
    username: string;
    password: string;
    port: string;
    database: string;
    ssl: string;
  };
  auth: {
    secret: string;
    expiration: string;
  };
  cryptography: { salt: number };
}

class Envs {
  private appEnvs: IAppEnv;

  constructor() {
    this.appEnvs = this.setupEnv();
  }

  private setupEnv(): IAppEnv {
    return {
      port: Number(process.env.APP_PORT) || 3333,
      logger: {
        enabled: Boolean(process.env.LOGGER_ENABLED) || false,
      },
      database: {
        address: process.env.DATABASE_ADDRESS || 'localhost',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'my password',
        port: process.env.DATABASE_PORT || '27017',
        database: process.env.DATABASE_NAME || 'test',
        ssl: process.env.DATABASE_SSL || 'false',
      },
      auth: {
        secret: process.env.AUTH_SECRET || 'secret',
        expiration: process.env.AUTH_EXPIRATION || '30m',
      },
      cryptography: {
        salt: Number(process.env.CRYPTOGRAPHY_SALT) || 10,
      },
    };
  }

  get app(): IAppEnv {
    return this.appEnvs || this.setupEnv();
  }
}

export default new Envs();
