interface IAppEnv {
  port: number;
  logger: { enabled: boolean };
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
        enabled: Boolean(process.env.LOGGER_ENABLED) || true,
      },
    };
  }

  get app(): IAppEnv {
    return this.appEnvs || this.setupEnv();
  }
}

export default new Envs();
