import ElasticSearchService from './ElasticSearchService';
import PinoLogger from '../pino';
import elasticsearch from 'elasticsearch';

const index = jest.fn();

elasticsearch.Client = jest.fn().mockReturnValue({ index });

describe('ElasticSearchService Tests', () => {
  describe('getClient', () => {
    it('should return elasticSearchClient when getClient is called', async () => {
      const client = jest.spyOn(elasticsearch, 'Client');

      const result = await ElasticSearchService.getClient();

      expect(client).toBeCalledWith({
        apiVersion: '7.x',
        host: 'elasticsearch:9200',
      });
      expect(result).toEqual({ index: expect.any(Function) });
    });
  });

  describe('log', () => {
    it('should call client.index with right params when log is called', async () => {
      const logParams = {
        index: 'Fake Index',
        type: 'Fake Type',
        body: { timestamp: new Date() },
      };

      await ElasticSearchService.log(logParams);

      expect(index).toBeCalledWith(logParams);
    });

    it('should log when getClients throw error', async () => {
      index.mockImplementationOnce(() => {
        throw new Error('Fake Error');
      });
      const error = jest.spyOn(PinoLogger.prototype, 'error');
      const logParams = {
        index: 'Fake Index',
        type: 'Fake Type',
        body: { timestamp: new Date() },
      };

      await ElasticSearchService.log(logParams);

      expect(index).toBeCalledWith(logParams);
      expect(error).toBeCalledWith({
        msg: 'ElasticSearch: 400 {"message":"Fake Error"}',
      });
    });
  });
});
