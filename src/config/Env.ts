interface IAppEnv {
  logger: { enabled: boolean };
}

class Envs {
  private appEnvs: IAppEnv;

  constructor() {
    this.appEnvs = this.setupEnv();
  }

  private setupEnv(): IAppEnv {
    return {
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
