interface IAppEnv {
  port: number;
  logger: {
    options: string[];
    elasticSearch: {
      url: string;
      port: number;
      version: string;
    };
  };
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
  rateLimiter: {
    maxRequests: number;
    maxInterval: number;
  };
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
        options: (process.env.LOGGER_OPTIONS || '').split(','),
        elasticSearch: {
          url: process.env.ELASTIC_SEARCH_URL || 'localhost',
          port: Number(process.env.ELASTIC_SEARCH_PORT) || 9200,
          version: process.env.ELASTIC_SEARCH_API_VERSION || '7.x',
        },
      },
      database: {
        address: process.env.DATABASE_ADDRESS || 'localhost',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'my_password',
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
      rateLimiter: {
        maxRequests: Number(process.env.RATE_LIMITER_MAX_REQUESTS) || 10,
        maxInterval:
          Number(process.env.RATE_LIMITER_MAX_INTERVAL) || 1 * 60 * 1000,
      },
    };
  }

  get app(): IAppEnv {
    return this.appEnvs || this.setupEnv();
  }
}

export default new Envs();
