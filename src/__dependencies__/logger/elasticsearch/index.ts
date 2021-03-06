import { ILogger, ILoggerParams } from '../../../util/logger/ILogger';

import ElasticSearchService from './ElasticSearchService';

export class ElasticSearchLogger implements ILogger {
  private static elasticSearchLogger: ElasticSearchLogger;

  info(message: ILoggerParams): void {
    this.logToElastic('info', message);
  }
  warning(message: ILoggerParams): void {
    this.logToElastic('warning', message);
  }
  error(message: ILoggerParams): void {
    this.logToElastic('error', message);
  }

  private logToElastic(type: string, body: { [key: string]: unknown }) {
    ElasticSearchService.log({
      index: 'api',
      type: '_doc',
      body: { ...body, timestamp: new Date(), type },
    });
  }

  public static getInstance(): ElasticSearchLogger {
    this.elasticSearchLogger = this.elasticSearchLogger
      ? this.elasticSearchLogger
      : new ElasticSearchLogger();
    return this.elasticSearchLogger;
  }
}
