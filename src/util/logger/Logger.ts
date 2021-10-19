import { ILogger, ILoggerParams } from './ILogger';

export class Logger {
  private loggers: ILogger[] = [];

  public constructor(...loggers: ILogger[]) {
    this.addLogger(...loggers);
  }

  public addLogger(...loggers: ILogger[]): void {
    this.loggers.push(...loggers);
  }

  public removeLogger(logger: ILogger): void {
    const loggerIndex = this.loggers.indexOf(logger);
    if (loggerIndex !== -1) {
      this.loggers.splice(loggerIndex);
    }
  }

  public info(message: ILoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.info(message);
    });
  }

  public warning(message: ILoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.warning(message);
    });
  }

  public error(message: ILoggerParams): void {
    this.loggers.forEach((logger) => {
      logger.error(message);
    });
  }
}
