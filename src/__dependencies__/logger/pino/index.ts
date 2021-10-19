import { ILogger, ILoggerParams } from '../../../util/logger/ILogger';

import pino from 'pino';

export default class PinoLogger implements ILogger {
  private static pinoLogger: PinoLogger;
  private pino;

  private constructor() {
    this.pino = pino();
  }

  public static getInstance(): PinoLogger {
    this.pinoLogger = this.pinoLogger ? this.pinoLogger : new PinoLogger();
    return this.pinoLogger;
  }

  public info(params: ILoggerParams): void {
    this.pino.info(params);
  }

  public error(params: ILoggerParams): void {
    this.pino.error(params);
  }

  public warning(params: ILoggerParams): void {
    this.pino.warn(params);
  }
}
