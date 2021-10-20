import { ElasticSearchLogger } from '.';
import ElasticSearchService from './ElasticSearchService';

jest.mock('./ElasticSearchService');
Date.prototype.toString = jest
  .fn()
  .mockReturnValue(
    'Wed Oct 20 2021 00:56:01 GMT-0300 (Horário Padrão de Brasília)'
  );

describe('ElasticSearchLogger Tests', () => {
  describe('info', () => {
    const log = jest.spyOn(ElasticSearchService, 'log');

    ElasticSearchLogger.getInstance().info({ msg: 'Fake message' });

    expect(log).toBeCalledWith({
      body: {
        msg: 'Fake message',
        timestamp:
          'Wed Oct 20 2021 00:56:01 GMT-0300 (Horário Padrão de Brasília)',
      },
      index: 'api',
      type: 'info',
    });
  });
  describe('warning', () => {
    it('should call logToElastic when warning is called', () => {
      const log = jest.spyOn(ElasticSearchService, 'log');

      ElasticSearchLogger.getInstance().warning({ msg: 'Fake message' });

      expect(log).toBeCalledWith({
        body: {
          msg: 'Fake message',
          timestamp:
            'Wed Oct 20 2021 00:56:01 GMT-0300 (Horário Padrão de Brasília)',
        },
        index: 'api',
        type: 'warning',
      });
    });
  });
  describe('error', () => {
    const log = jest.spyOn(ElasticSearchService, 'log');

    ElasticSearchLogger.getInstance().error({ msg: 'Fake message' });

    expect(log).toBeCalledWith({
      body: {
        msg: 'Fake message',
        timestamp:
          'Wed Oct 20 2021 00:56:01 GMT-0300 (Horário Padrão de Brasília)',
      },
      index: 'api',
      type: 'error',
    });
  });
});
