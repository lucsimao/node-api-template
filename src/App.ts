import Env from './config/Env';
import Logger from './util/logger';
import SignRoutes from './routes/SignIn';
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

  public setup(): void {
    Logger.info({ msg: 'Starting application setup...' });
    this.setupMiddlewares();
    this.setupDatabase();
    Logger.info({ msg: 'Finished application setup' });
  }

  public setupMiddlewares(): void {
    Logger.info({ msg: 'Starting routes setup...' });
    SignRoutes.addRoute(this.application);
    Logger.info({ msg: 'Finished routes setup' });
  }

  public setupDatabase(): void {
    Logger.info({ msg: 'Connecting to database...' });
    Logger.info({ msg: 'Connected to database successfully' });
  }

  public async close(): Promise<void> {
    Logger.info({ msg: 'Closing application...' });
    await this.application.closeServer();
    Logger.info({ msg: 'Application Closed' });
  }
}
