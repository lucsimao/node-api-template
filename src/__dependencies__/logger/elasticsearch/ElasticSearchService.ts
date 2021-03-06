import elasticsearch, { Client } from 'elasticsearch';

import { ApplicationError } from '../../../util/errors/ApplicationError';
import Env from '../../../config/Env';
import { ErrorService } from '../../../services/ErrorService';
import PinoLogger from '../pino/index';

const elasticSearchEnv = Env.app.logger.elasticSearch;
export interface ITransportParams {
  readonly index: string;
  readonly type: string;
  readonly body: { timestamp: Date; [key: string]: unknown };
}

export default class ElasticSearchService {
  private static client: Client;

  public static async getClient(): Promise<Client> {
    this.client = this.client
      ? this.client
      : new elasticsearch.Client({
          host: `${elasticSearchEnv.url}:${elasticSearchEnv.port}`,
          apiVersion: elasticSearchEnv.version,
        });
    return this.client;
  }

  public static async log(params: ITransportParams): Promise<void> {
    try {
      const client = await this.getClient();
      await client.index(params);
    } catch (err) {
      const error = ErrorService.parseApplicationError(err as ApplicationError);
      PinoLogger.getInstance().error({
        msg: `ElasticSearch: ${error.statusCode} ${JSON.stringify(error.body)}`,
      });
    }
  }
}
