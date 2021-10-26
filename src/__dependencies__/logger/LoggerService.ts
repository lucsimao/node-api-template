import { ElasticSearchLogger } from './elasticsearch';
import Env from '../../config/Env';
import { ILogger } from '../../util/logger/ILogger';
import PinoLogger from './pino';

export class LoggerService {
  public static getLoggersFromEnv(): ILogger[] {
    const loggerOptions = Env.app.logger.options;

    const loggers: ILogger[] = [];

    const validLoggers = {
      ['elasticsearch'.toString()]: ElasticSearchLogger.getInstance(),
      ['console'.toString()]: PinoLogger.getInstance(),
    };

    const validLoggersKeys = Object.keys(validLoggers);

    loggerOptions.forEach((logger: string) => {
      if (validLoggersKeys.includes(logger)) {
        loggers.push(validLoggers[logger]);
      }
    });

    return loggers;
  }
}
