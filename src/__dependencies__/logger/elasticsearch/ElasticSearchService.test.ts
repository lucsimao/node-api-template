import ElasticSearchService from './ElasticSearchService';
import elasticsearch from 'elasticsearch';

jest.mock('elasticsearch');
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
  });
});
