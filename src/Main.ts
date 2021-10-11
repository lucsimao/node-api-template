import App from './App';
import Env from './config/Env';
import Logger from './util/logger';

export enum ExitStatus {
  Failure = 1,
  Success = 0,
}

export default class Main {
  public static async start(): Promise<void> {
    try {
      await this.initServices();
    } catch (error) {
      Logger.error({ msg: `App exited with error: ${error}` });
      process.exit(ExitStatus.Failure);
    }
  }

  private static async initServices() {
    const app = new App(Number(Env.app.port));
    await app.setup();
    app.start();
    this.setupUncaughtExceptions();
    this.setupUnhandledRejection();
    this.setupGracefulShutdown(app);
  }

  private static setupUncaughtExceptions() {
    process.on('uncaughtException', (error) => {
      Logger.error({
        msg: `App exiting due to an uncaught exception: ${error}`,
      });
      process.exit(ExitStatus.Failure);
    });
  }

  private static setupUnhandledRejection() {
    process.on('unhandledRejection', (reason, promise) => {
      Logger.error({
        msg: `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
      });
      throw reason;
    });
  }

  private static setupGracefulShutdown(app: App) {
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        Logger.info({ msg: `Graceful shutdown starting...` });
        await app.close();
        Logger.info({ msg: `App exited with success` });
        process.exit(ExitStatus.Success);
      });
    }
  }
}
