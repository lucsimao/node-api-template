import Env from './config/Env';
import Logger from './util/logger';
import database from './databases/persistenceDataBase';
import notFoundMiddleware from './middlewares/NotFoundMiddleware';
import rateLimiterMiddleware from './middlewares/RateLimiterMiddleware';
import routes from './routes';
import webFramework from './util/webFramework/framework';

export default class App {
  private application;

  constructor(private port: number = Env.app.port) {
    this.application = webFramework;
  }

  public start(): void {
    Logger.info({ msg: `Starting server on port ${this.port}...` });
    this.application.startServer(this.port, () => {
      Logger.info({ msg: `Server listening on port ${this.port}` });
    });
  }

  public async setup(): Promise<void> {
    Logger.info({ msg: 'Starting application setup...' });
    this.setupMiddlewares();
    await this.setupDatabase();
    Logger.info({ msg: 'Finished application setup' });
  }

  public setupMiddlewares(): void {
    Logger.info({ msg: 'Starting routes setup...' });
    this.application.addMiddleware(rateLimiterMiddleware);
    routes.setup(this.application);
    this.application.addMiddleware(notFoundMiddleware);
    Logger.info({ msg: 'Finished routes setup' });
  }

  public async setupDatabase(): Promise<void> {
    Logger.info({ msg: 'Connecting to database...' });
    await database.connect();
    Logger.info({ msg: 'Connected to database successfully' });
  }

  public async close(): Promise<void> {
    Logger.info({ msg: 'Closing application...' });
    await this.application.closeServer();
    await database.close();
    Logger.info({ msg: 'Application Closed' });
  }

  public getApp(): unknown {
    return this.application.getApp();
  }
}
